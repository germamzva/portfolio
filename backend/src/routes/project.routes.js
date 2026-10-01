import { Router } from "express";

const router = Router();

// controller
import Projects from "../controllers/project.controller.js";

router.get("/", Projects.getProject);
router.get("/:id", Projects.getProjectById);
router.post("/create", Projects.addProject);
router.put("/edit/:id", Projects.editProject);
router.delete("/delete/:id", Projects.deleteProject);

export default router;
