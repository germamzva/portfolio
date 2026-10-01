import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Education from "../backend/src/models/education.model.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method === "GET") {
    try {
      const educations = await Education.find();
      res.status(200).json(educations);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "POST") {
    const token = req.cookies.resumeToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.userId;

    try {
      const newEducation = await Education.create({
        ...req.body,
        userId: userid,
      });
      if (!newEducation) {
        return res
          .status(400)
          .json({ status: "error", message: "Education not created" });
      }
      res.status(201).json({
        status: "success",
        message: "Education successfully created!",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
