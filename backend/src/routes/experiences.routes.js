import { Router } from "express";

const router = Router();

// controller
import Experiences from "../controllers/experiences.controller.js";

router.get("/", Experiences.getExperiences);
router.get("/:id", Experiences.getExperienceById);
router.post("/create", Experiences.addExperience);
router.put("/edit/:id", Experiences.editExperience);
router.delete("/delete/:id", Experiences.deleteExperience);

export default router;
