import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Experience from "../backend/src/models/experience.model.js";
import Resume from "../backend/src/models/resume.model.js";
import User from "../backend/src/models/user.model.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method === "GET") {
    try {
      const experiences = await Experience.find();
      res.status(200).json(experiences);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "POST") {
    const token = req.cookies.resumeToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { company, position, description, total_from, total_to } = req.body;
    if (!company || !position || !description || !total_from || !total_to) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in the required fields",
      });
    }

    try {
      const totalYear =
        new Date(total_to).getFullYear() - new Date(total_from).getFullYear();
      const newData = {
        company: req.body.company,
        position: req.body.position,
        description: req.body.description,
        total_from: req.body.total_from,
        total_to: req.body.total_to,
        total_year: totalYear,
        userId: userId,
      };
      const experience = await Experience.create(newData);
      const checkResumeExists = await Resume.findOne();
      if (!checkResumeExists) {
        const newResume = new Resume({
          experiences: [experience._id],
        });
        await newResume.save();
      }
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            "ids.0.experience": experience._id,
          },
        },
        { new: true },
      );
      res.status(201).json({
        status: "success",
        message: "Experience has been created successfully",
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
