import { connectDB, setCorsHeaders } from "../_utils.js";
import Personal from "../backend/src/models/personalInfo.model.js";
import Education from "../backend/src/models/education.model.js";
import Experience from "../backend/src/models/experience.model.js";
import Project from "../backend/src/models/project.model.js";
import Skills from "../backend/src/models/skills.model.js";
import User from "../backend/src/models/user.model.js";

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userId = req.query.userId;
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
