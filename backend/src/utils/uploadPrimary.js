import multer from "multer";
import path from "path";

// profile image
const profile_uploads = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Ensure this folder exists in your project root
  },
  filename: (req, file, cb) => {
    // Unique filename using timestamp + original name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const profile_storage = multer({ storage: profile_uploads });
