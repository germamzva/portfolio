import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import User from "../backend/src/models/user.model.js";

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

    const token = req.cookies.resumeToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const user = await User.findById(userExists._id).select(
      "username email role lastLogin",
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
