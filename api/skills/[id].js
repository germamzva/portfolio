import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Skills from "../backend/src/models/skills.model.js";

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
  const userId = decoded.userId;

  if (req.method === "PUT") {
    try {
      const checkSkillsExists = await Skills.findOne({
        _id: req.query.id,
        userId: userId,
      });
      if (!checkSkillsExists) {
        return res.status(404).json({
          status: "error",
          message: "Skills not found",
        });
      }

      const editData = {
        skills: req.body.skill,
      };
      const skills = await Skills.findByIdAndUpdate(req.query.id, editData, {
        new: true,
      }).sort({ createdAt: "desc" });
      res.status(200).json({
        status: "success",
        message: "Skills has been updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const skills = await Skills.findOneAndDelete({
        _id: req.query.id,
        userId: userId,
      });
      res.status(200).json({
        status: "success",
        message: "Skills has been deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
