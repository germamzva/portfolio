import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Resume",
    },
    personal_info: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo",
      },
    ],
    experiences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    educations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
