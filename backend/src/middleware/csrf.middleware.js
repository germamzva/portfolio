import crypto from "crypto";

// Generate a CSRF token
export const generateCSRFToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// CSRF protection middleware
export const csrfProtection = (req, res, next) => {
  // Skip CSRF for GET requests
  if (req.method === "GET") {
    return next();
  }

  const token = req.headers["x-csrf-token"];

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "CSRF token is missing",
    });
  }

  // Validate token against session
  if (req.session.csrfToken !== token) {
    return res.status(403).json({
      status: "error",
      message: "Invalid CSRF token",
    });
  }

  next();
};

// Middleware to generate and set CSRF token in session
export const setCSRFToken = (req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = generateCSRFToken();
  }
  next();
};
