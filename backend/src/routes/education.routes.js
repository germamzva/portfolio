import { Router } from "express";

const router = new Router();

// controller
import Educations from "../controllers/education.controller.js";

router.get("/", Educations.getEducation);
router.get("/:id", Educations.getEducationById);
router.post("/create", Educations.addEducation);
router.put("/edit/:id", Educations.updateEducation);
router.delete("/delete/:id", Educations.deleteEducation);

export default router;
