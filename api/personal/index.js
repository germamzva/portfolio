import jwt from "jsonwebtoken";
import { connectDB, setCorsHeaders } from "../_utils.js";
import PersonalInfo from "../backend/src/models/personalInfo.model.js";
import Resume from "../backend/src/models/resume.model.js";
import User from "../backend/src/models/user.model.js";

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
      const personalInfo = await PersonalInfo.find({ userId: userId });
      res.status(200).json(personalInfo);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  } else if (req.method === "POST") {
    try {
      const checkInfoExits = await PersonalInfo.findOne({ userId: userId });
      if (!checkInfoExits) {
        const newData = {
          fullname: req.body.fullname,
          position: req.body.position,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
          ...(req.body.links?.length > 0 && { links: req.body.links }),
          about_summary: req.body.aboutSummary,
          userId: userId,
        };

        const personalInfo = await PersonalInfo.create(newData);
        const checkResumeExists = await Resume.findOne({ user: userId });
        if (!checkResumeExists) {
          const newResume = new Resume({
            personal_info: [personalInfo._id],
            user: userId,
          });
          await newResume.save();
        }
        await User.findByIdAndUpdate(userId, {
          ids: { personal_info: personalInfo._id },
        });
        res.status(201).json({
          status: "success",
          message: "Personal Info has been created",
        });
      } else {
        const updateData = {
          fullname: req.body.fullname || checkInfoExits.fullname,
          position: req.body.position || checkInfoExits.position,
          address: req.body.address || checkInfoExits.address,
          email: req.body.email || checkInfoExits.email,
          phone: req.body.phone || checkInfoExits.phone,
          links: req.body.links || checkInfoExits.links,
          about_summary: req.body.aboutSummary || checkInfoExits.about_summary,
        };

        const personalInfo = await PersonalInfo.findOneAndUpdate(
          { userId },
          { $set: updateData },
          { new: true },
        );
        res.status(201).json({
          status: "success",
          message: "Personal Info has been updated",
        });
      }
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
