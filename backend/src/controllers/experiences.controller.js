import Experience from "../models/experience.model.js";
import Resume from "../models/resume.model.js";
import User from "../models/user.model.js";

class Experiences {
  async getExperiences(req, res) {
    try {
      const experiences = await Experience.find();
      res.status(200).json(experiences);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getExperienceById(req, res) {
    try {
      // check experience exists for security reason
      const checkExperienceExists = await Experience.findById(req.params.id);
      if (!checkExperienceExists) {
        return res.status(404).json({
          status: "error",
          message: "Experience not found",
        });
      }

      // const experience = await Experience.findById(req.params.id);
      res.status(200).json(checkExperienceExists);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async addExperience(req, res) {
    const userId = req.userId;
    console.log(userId);
    const { company, position, description, total_from, total_to } = req.body;
    if (!company || !position || !description || !total_from || !total_to) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in the required fields",
      });
    }

    try {
      // calculate total year
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
  }
  async editExperience(req, res) {
    try {
      // check experience exists for security reason
      const checkExperienceExists = await Experience.findById(req.params.id);
      if (!checkExperienceExists) {
        return res.status(404).json({
          status: "error",
          message: "Experience not found",
        });
      }

      // calculate total year
      const totalYear =
        new Date(req.body.total_to).getFullYear() -
        new Date(req.body.total_from).getFullYear();

      // lets check if the experience already exists
      const newData = {
        company: req.body.company,
        position: req.body.position,
        description: req.body.description,
        total_from: req.body.total_from,
        total_to: req.body.total_to,
        total_year: totalYear,
      };

      const experience = await Experience.findOneAndUpdate(
        { _id: req.params.id },
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
  }

  async deleteExperience(req, res) {
    const userId = req.userId;
    try {
      // check if the experience exists
      const checkExperienceExists = await Experience.findById(req.params.id);
      if (!checkExperienceExists) {
        return res.status(404).json({
          status: "error",
          message: "Experience not found",
        });
      }

      const experience = await Experience.findByIdAndDelete(req.params.id);
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
  }
}

export default new Experiences();
