import { Router } from "express";

const router = new Router();

// controller
import Contacts from "../controllers/contact.controller.js";
// rate limiting
import { contactLimiter } from "../middleware/rateLimit.middleware.js";
// csrf protection
import { csrfProtection, setCSRFToken } from "../middleware/csrf.middleware.js";
// captcha
import { setCaptcha, validateCaptcha } from "../middleware/captcha.middleware.js";

// Get CSRF token
router.get("/csrf-token", setCSRFToken, (req, res) => {
  res.json({ csrfToken: req.session.csrfToken });
});

// Get CAPTCHA
router.get("/captcha", setCaptcha, (req, res) => {
  res.json({
    question: req.session.captcha.question,
    token: req.session.captcha.token,
  });
});

// Create contact (protected)
router.post("/create", contactLimiter, csrfProtection, validateCaptcha, Contacts.createContact);

export default router;
