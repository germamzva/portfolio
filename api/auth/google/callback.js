import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { connectDB, setCorsHeaders } from "../../_utils.js";
import User from "../../backend/src/models/user.model.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code } = req.query;

  try {
    await connectDB();

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    const { tokens } = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials({ tokens });

    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    const data = await profileResponse.json();

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

    const userData = {
      userId: user._id,
      role: user.role,
      email: user.email,
    };

    const loginToken = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("resumeToken", loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect(process.env.FRONTEND_URL || "http://localhost:5173/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
