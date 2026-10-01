import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    google_id: {
      type: String,
      required: false,
      sparse: true,
    },
    lastLogin: {
      type: Date,
      required: false,
      sparse: true,
    },
    ids: [
      {
        resume: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Resume",
        },
        personal_info: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PersonalInfo",
        },
        experience: [
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
    ],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
