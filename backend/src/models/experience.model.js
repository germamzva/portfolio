import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  total_from: {
    type: String,
    required: false,
  },
  total_to: {
    type: String,
    required: false,
  },
  total_year: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Experience", experienceSchema);
