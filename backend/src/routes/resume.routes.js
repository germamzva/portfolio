import { Router } from "express";

const router = Router();

// controller
import Resume from "../controllers/resume.controller.js";

router.get("/:userId", Resume.getResume);

export default router;
