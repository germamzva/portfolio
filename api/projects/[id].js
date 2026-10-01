import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Project from "../backend/src/models/project.model.js";

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
      const checkProjectExists = await Project.findById(req.query.id);
      if (!checkProjectExists) {
        return res.status(404).json({
          status: "error",
          message: "Project not found",
        });
      }
      res.status(200).json(checkProjectExists);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "PUT") {
    const { name, description, tools, link } = req.body;

    if (!name || !description || !tools || !link) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in the required fields",
      });
    }

    try {
      const checkProjectExists = await Project.findById(req.query.id);
      if (!checkProjectExists) {
        return res.status(404).json({
          status: "error",
          message: "Project not found",
        });
      }

      const project = await Project.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        returnDocument: "after",
      });

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const project = await Project.findByIdAndDelete(req.query.id);
      res.status(200).json({
        status: "success",
        message: "Project has been deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
