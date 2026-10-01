import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

dotenv.config();

// db connection
import connectDB from "./utils/db.js";

// verify token
import { verify } from "./middleware/verify.middleware.js";
// rate limiting
import { generalLimiter, contactLimiter } from "./middleware/rateLimit.middleware.js";
// csrf protection
import { setCSRFToken } from "./middleware/csrf.middleware.js";
// captcha
import { setCaptcha } from "./middleware/captcha.middleware.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import personalRoutes from "./routes/personal.routes.js";
import skillsRoutes from "./routes/skills.routes.js";
import experiencesRoutes from "./routes/experiences.routes.js";
import projectRoutes from "./routes/project.routes.js";
import educationRoutes from "./routes/education.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import contactRoutes from "./routes/contact.routes.js";

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" })); // Limit request body size
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(generalLimiter); // Apply general rate limiting to all routes
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  }),
);
app.use("/uploads", express.static("./uploads"));

// middlewares
app.use("/api/auth", authRoutes);
app.use("/api/user", verify, userRoutes);
app.use("/api/personal", verify, personalRoutes);
app.use("/api/skills", verify, skillsRoutes);
app.use("/api/experiences", verify, experiencesRoutes);
app.use("/api/projects", verify, projectRoutes);
app.use("/api/education", verify, educationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/contact", contactRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
