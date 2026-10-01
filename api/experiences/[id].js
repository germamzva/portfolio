import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import Experience from "../backend/src/models/experience.model.js";
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
      const checkExperienceExists = await Experience.findById(req.query.id);
      if (!checkExperienceExists) {
        return res.status(404).json({
          status: "error",
          message: "Experience not found",
        });
      }
      res.status(200).json(checkExperienceExists);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      const checkExperienceExists = await Experience.findById(req.query.id);
      if (!checkExperienceExists) {
        return res.status(404).json({
          status: "error",
          message: "Experience not found",
        });
      }

      const totalYear =
        new Date(req.body.total_to).getFullYear() -
        new Date(req.body.total_from).getFullYear();

      const newData = {
        company: req.body.company,
        position: req.body.position,
        description: req.body.description,
        total_from: req.body.total_from,
        total_to: req.body.total_to,
        total_year: totalYear,
      };

      const experience = await Experience.findOneAndUpdate(
        { _id: req.query.id },
        { $set: newData },
        { new: true },
      );
      res.status(200).json({
        status: "success",
        message: "Experience has been updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    const token = req.cookies.resumeToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    try {
      const checkExperienceExists = await Experience.findById(req.query.id);
      if (!checkExperienceExists) {
        return res.status(404).json({
          status: "error",
          message: "Experience not found",
        });
      }

      const experience = await Experience.findByIdAndDelete(req.query.id);
      await User.findByIdAndUpdate(userId, {
        $pull: {
          "ids.experience": experience._id,
        },
      });
      res.status(200).json({
        status: "success",
        message: "Experience has been deleted successfully",
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
