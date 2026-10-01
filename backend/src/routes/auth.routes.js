import { Router } from "express";

const router = Router();

// controller
import { google_callback, google_url } from "../controllers/auth.controller.js";

router.get("/google/url", google_url);
router.get("/google/callback", google_callback);

export default router;
