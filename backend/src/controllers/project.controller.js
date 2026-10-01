import puppeteer from "puppeteer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// utils
import { screenshotImg } from "../utils/screenshotImg.js";

// models
import Project from "../models/project.model.js";
import Resume from "../models/resume.model.js";

class Projects {
  async getProject(req, res) {
    const userid = req.userId;
    try {
      const project = await Project.find({ userId: userid });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async getProjectById(req, res) {
    const userid = req.userId;
    try {
      // check project exists for security reason
      const checkProjectExists = await Project.findById(req.params.id);
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
  }

  async addProject(req, res) {
    const userid = req.userId;
    // destructure data
    const { name, description, tools, link } = req.body;
    // check if the required fields are filled
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

      // take screenshot on the project and compress and convert into webp
      // this returns image path of the project screenshot
      const projectFolder = await screenshotImg(link, project._id, userid);

      project.screenshot = projectFolder;

      await project.save();

      res
        .status(201)
        .json({ status: "success", message: "Project successfully created!" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async editProject(req, res) {
    const userid = req.userId;

    const { name, description, tools, link } = req.body;

    // check if the required fields are filled
    if (!name || !description || !tools || !link) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in the required fields",
      });
    }

    try {
      // check project exists for security reason
      const checkProjectExists = await Project.findById(req.params.id);
      if (!checkProjectExists) {
        return res.status(404).json({
          status: "error",
          message: "Project not found",
        });
      }

      const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        returnDocument: "after",
      });

      // take screenshot on the project and compress and convert into webp
      // this returns image path of the project screenshot
      const projectFolder = await screenshotImg(link, req.params.id, userid);
      project.screenshot = projectFolder;
      await project.save();

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async deleteProject(req, res) {
    const userid = req.userId;
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
        message: "Project has been deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

export default new Projects();
