import crypto from "crypto";
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

  try {
    await connectDB();

    const state = crypto.randomBytes(16).toString("hex");

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

    res.json({ url: authorizeUrl, state });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
