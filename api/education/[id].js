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
    const token = req.cookies.resumeToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.userId;

    try {
      const education = await Education.findOne({
        _id: req.query.id,
        userId: userid,
      });
      res.status(200).json(education);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "PUT") {
    const token = req.cookies.resumeToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.userId;

    try {
      const checkEducationExists = await Education.findOne({
        _id: req.query.id,
        userId: userid,
      });
      if (!checkEducationExists) {
        return res.status(404).json({
          status: "error",
          message: "Education not found",
        });
      }

      const editData = {
        school_name: req.body.school_name,
        course: req.body.course,
        start_year: req.body.start_year,
        end_year: req.body.end_year,
        description: req.body.description,
      };

      const education = await Education.findByIdAndUpdate(
        req.query.id,
        editData,
        { new: true },
      );
      res.status(200).json({
        status: "success",
        message: "Education has been updated successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "DELETE") {
    const token = req.cookies.resumeToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.userId;

    try {
      const checkEducationExists = await Education.findOne({
        _id: req.query.id,
        userId: userid,
      });
      if (!checkEducationExists) {
        return res.status(404).json({
          status: "error",
          message: "Education not found",
        });
      }

      const education = await Education.findByIdAndDelete(req.query.id);

      res.status(200).json({
        status: "success",
        message: "Education has been deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
