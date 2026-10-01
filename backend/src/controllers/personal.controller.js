import PersonalInfo from "../models/personalInfo.model.js";
import Resume from "../models/resume.model.js";
import User from "../models/user.model.js";

class PersonalInfos {
  async getPersonalInfo(req, res) {
    const userid = req.userId;
    try {
      const personalInfo = await PersonalInfo.find({ userId: userid });
      res.status(200).json(personalInfo);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  // create or update
  async createUpdatePersonalInfo(req, res) {
    const userId = req.userId;
    try {
      const checkInfoExits = await PersonalInfo.findOne({ userId: userId });
      if (!checkInfoExits) {
        const newData = {
          fullname: req.body.fullname,
          position: req.body.position,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
          // if links is empty then do not include
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
        // lets update the user
        await User.findByIdAndUpdate(userId, {
          ids: { personal_info: personalInfo._id },
        });
        res.status(201).json({
          status: "success",
          message: "Personal Info has been created",
        });
      } else {
        // lets execute update
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
  }

  async getPrimaryImage(req, res) {
    const userid = req.userId;
    try {

      const personalInfo = await PersonalInfo.findOne({
        userId: userid,
      }).select("image");
      res.status(200).json(personalInfo);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  // upload profile pic
  async uploadProfilePic(req, res) {
    const userId = req.userId;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "error",
          message: "No file uploaded",
        });
      }

      const updateProfilePic = await PersonalInfo.findOneAndUpdate(
        { userId },
        { $set: { image: req.file.filename } },
        { returnDocument: "after" },
      );

      if (!updateProfilePic) {
        // if not found, create new
        const newPersonalInfo = new PersonalInfo({
          userId,
          image: req.file.filename,
        });
        await newPersonalInfo.save();
      }

      res.status(201).json({
        status: "success",
        message: "Profile picture has been uploaded",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new PersonalInfos();
