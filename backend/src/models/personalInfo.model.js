import mongoose from "mongoose";

const perosnalInfoSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    links: [
      {
        name: {
          type: String,
          required: false,
        },
        link: {
          type: String,
          required: false,
        },
      },
    ],
    image: {
      type: String,
      required: false,
    },
    about_summary: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("PersonalInfo", perosnalInfoSchema);
