import Education from "../models/education.model.js";
import Resume from "../models/resume.model.js";

class Educations {
  async getEducation(req, res) {
    try {
      const educations = await Education.find();
      res.status(200).json(educations);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async addEducation(req, res) {
    const userid = req.userId;
    try {
      const newEducation = await Education.create({
        ...req.body,
        userId: userid,
      });
      if (!newEducation) {
        return res
          .status(400)
          .json({ status: "error", message: "Education not created" });
      }
      res.status(201).json({
        status: "success",
        message: "Education successfully created!",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getEducationById(req, res) {
    const userid = req.userId;
    try {
      const education = await Education.findOne({
        _id: req.params.id,
        userId: userid,
      });
      res.status(200).json(education);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async updateEducation(req, res) {
    const userid = req.userId;
    try {
      const checkEducationExists = await Education.findOne({
        _id: req.params.id,
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
        req.params.id,
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
  }

  async deleteEducation(req, res) {
    const userid = req.userId;
    try {
      // check if the education exists
      const checkEducationExists = await Education.findOne({
        _id: req.params.id,
        userId: userid,
      });
      if (!checkEducationExists) {
        return res.status(404).json({
          status: "error",
          message: "Education not found",
        });
      }

      const education = await Education.findByIdAndDelete(req.params.id);

      res.status(200).json({
        status: "success",
        message: "Education has been deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

export default new Educations();
