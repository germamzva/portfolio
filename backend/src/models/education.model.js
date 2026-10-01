import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    school_name: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    start_year: {
      type: String,
      required: true,
    },
    end_year: {
      type: String,
      required: true,
    },
    description: {
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

export default mongoose.model("Education", educationSchema);
