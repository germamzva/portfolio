import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    skill_type: {
      type: String,
      enum: ["frontend", "backend", "cms", "others"],
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Skills", skillsSchema);
