import { Router } from "express";

// controller
import mySkills from "../controllers/skills.controller.js";

const router = Router();

router.get("/", mySkills.getSkills);
router.post("/add", mySkills.addSkills);
router.put("/edit/:id", mySkills.editSkills);
router.delete("/delete/:id", mySkills.deleteSkills);

export default router;
