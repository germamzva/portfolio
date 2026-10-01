// Simple input sanitization to prevent XSS attacks
export const sanitizeInput = (input) => {
  if (typeof input !== "string") {
    return input;
  }

  // Remove potentially dangerous characters and patterns
  return input
    .replace(/[<>]/g, "") // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers like onclick=
    .replace(/data:/gi, "") // Remove data: protocol
    .trim()
    .substring(0, 1000); // Limit length to 1000 characters
};

export const sanitizeContactData = (data) => {
  const { name, email, message } = data;

  return {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    message: sanitizeInput(message),
  };
};
