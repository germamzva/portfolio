import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Skills from "../backend/src/models/skills.model.js";
import Resume from "../backend/src/models/resume.model.js";

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

  if (req.method === "GET") {
    try {
      const skills = await Skills.find({ userId: userId }).sort({
        createdAt: "desc",
      });
      res.status(200).json(skills);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "POST") {
    try {
      if (!req.body.skill_type || !req.body.skills) {
        return res.status(400).json({
          status: "error",
          message: "Type and Skills is required",
        });
      }

      const checkSkillsExists = await Skills.findOne({
        skills: req.body.skills,
      });

      if (checkSkillsExists) {
        return res.status(400).json({
          status: "error",
          message: "Skills already exists",
        });
      } else {
        const checkResumeExists = await Resume.findOne();
        const skills = await Skills.create({
          ...req.body,
          userId: userId,
        });
        if (!checkResumeExists) {
          const newResume = new Resume({
            skills: [skills._id],
          });
          await newResume.save();
        }
        res.status(201).json({
          status: "success",
          message: "Skills has been added successfully",
        });
      }
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
