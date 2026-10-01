import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Project from "../backend/src/models/project.model.js";
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
  const userid = decoded.userId;

  if (req.method === "GET") {
    try {
      const project = await Project.find({ userId: userid });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "POST") {
    const { name, description, tools, link } = req.body;
    if (!name || !description || !tools || !link) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in the required fields",
      });
    }

    try {
      const newData = {
        name: name,
        description: description,
        tools: tools,
        link: link,
        userId: userid,
      };
      const project = await Project.create(newData);
      const checkResumeExists = await Resume.findOne({ userId: userid });
      if (!checkResumeExists) {
        const newResume = new Resume({
          projects: [project._id],
          userId: userid,
        });
        await newResume.save();
      }

      res
        .status(201)
        .json({ status: "success", message: "Project successfully created!" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
