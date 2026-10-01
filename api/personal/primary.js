import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import PersonalInfo from "../backend/src/models/personalInfo.model.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectDB();

  const token = req.cookies.resumeToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userid = decoded.userId;

  if (req.method === "GET") {
    try {
      const personalInfo = await PersonalInfo.findOne({
        userId: userid,
      }).select("image");
      res.status(200).json(personalInfo);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
