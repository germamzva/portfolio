import Personal from "../models/personalInfo.model.js";
import Education from "../models/education.model.js";
import Experience from "../models/experience.model.js";
import Project from "../models/project.model.js";
import Skills from "../models/skills.model.js";
import User from "../models/user.model.js";

class Resume {
  async getResume(req, res) {
    const userId = req.params.userId;
    try {
      const [user, personalInfo, educations, experiences, projects, skills] =
        await Promise.all([
          User.findById(userId).select("username email"),
          Personal.find({ userId }).select(
            "fullname phone email address image links about_summary position",
          ),
          Education.find({ userId }).select(
            "school_name course start_year end_year description",
          ),
          Experience.find({ userId }).select(
            "company position total_from total_to description total_year",
          ),
          Project.find({ userId }).select("name description tools link"),
          Skills.find({ userId }).select("skill_type skills"),
        ]);

      const resumeInfo = {
        user,
        personalInfo,
        educations,
        experiences,
        projects,
        skills,
      };

      res.status(200).json({ status: "success", resumeInfo });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

export default new Resume();
