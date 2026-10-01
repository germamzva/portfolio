import crypto from "crypto";

// Generate a simple math CAPTCHA
export const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
  const num2 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
  const answer = num1 + num2;
  const token = crypto.randomBytes(16).toString("hex");

  return {
    question: `${num1} + ${num2} = ?`,
    answer,
    token,
  };
};

// Store CAPTCHA in session
export const setCaptcha = (req, res, next) => {
  const captcha = generateCaptcha();
  req.session.captcha = {
    question: captcha.question,
    answer: captcha.answer,
    token: captcha.token,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
  };
  next();
};

// Validate CAPTCHA
export const validateCaptcha = (req, res, next) => {
  const { captchaAnswer, captchaToken } = req.body;

  if (!captchaAnswer || !captchaToken) {
    return res.status(400).json({
      status: "error",
      message: "CAPTCHA is required",
    });
  }

  const sessionCaptcha = req.session.captcha;

  if (!sessionCaptcha) {
    return res.status(400).json({
      status: "error",
      message: "CAPTCHA session expired. Please refresh the page.",
    });
  }

  // Check if CAPTCHA has expired
  if (Date.now() > sessionCaptcha.expiresAt) {
    delete req.session.captcha;
    return res.status(400).json({
      status: "error",
      message: "CAPTCHA expired. Please refresh the page.",
    });
  }

  // Validate answer and token
  if (
    parseInt(captchaAnswer) !== sessionCaptcha.answer ||
    captchaToken !== sessionCaptcha.token
  ) {
    return res.status(400).json({
      status: "error",
      message: "Incorrect CAPTCHA answer",
    });
  }

  // Clear CAPTCHA after successful validation
  delete req.session.captcha;
  next();
};
