import crypto from "crypto";
import session from "express-session";
import jwt from "jsonwebtoken";

import { OAuth2Client } from "google-auth-library";

import User from "../models/user.model.js";

export const google_url = async (req, res) => {
  try {
    const state = crypto.randomBytes(16).toString("hex");

    req.session.oauth_state = state;

    const googleClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    const authorizeUrl = googleClient.generateAuthUrl({
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: ["openid", "email", "profile"],
      state,
    });

    res.json({ url: authorizeUrl });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const google_callback = async (req, res) => {
  const { code, state } = req.query;
  try {
    if (state !== req.session.oauth_state) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid state" });
    }

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    const { tokens } = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials({ tokens });

    // const { data } = await oAuth2Client.request({
    //   url: "https://www.googleapis.com/oauth2/v1/userinfo",
    // });

    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    const data = await profileResponse.json();

    // check if user already exists
    let user =
      (await User.findOne({ email: data.email })) ||
      (await User.findOne({ google_id: data.id }));

    if (!user) {
      user = new User({
        username: data.name,
        email: data.email,
        google_id: data.id,
        role: "user",
      });
      await user.save();
    } else {
      user.lastLogin = new Date();
      user.google_id = data.id;
      await user.save();
    }
    console.log("DATA", user);

    // OAuth state is no longer needed
    delete req.session.oauth_state;

    const userData = {
      userId: user._id,
      role: user.role,
      email: user.email,
    };

    const loginToken = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("JWT:", loginToken);

    res.cookie("resumeToken", loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // res.status(200).json({ status: "success", message: "Login successfully" });
    res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    console.log(error);
  }
};
