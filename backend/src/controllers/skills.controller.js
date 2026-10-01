import Skills from "../models/skills.model.js";
import Resume from "../models/resume.model.js";

class mySkills {
  async getSkills(req, res) {
    const userId = req.userId;
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
  }
  async addSkills(req, res) {
    const userId = req.userId;
    try {
      if (!req.body.skill_type || !req.body.skills) {
        return res.status(400).json({
          status: "error",
          message: "Type and Skills is required",
        });
      }

      // lets check if the skills already exists
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
  }

  async editSkills(req, res) {
    const userId = req.userId;
    try {
      const checkSkillsExists = await Skills.findOne({
        _id: req.params.id,
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
      const skills = await Skills.findByIdAndUpdate(req.params.id, editData, {
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
  }

  async deleteSkills(req, res) {
    const userId = req.userId;
    try {
      const skills = await Skills.findOneAndDelete({
        _id: req.params.id,
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
  }
}

export default new mySkills();
