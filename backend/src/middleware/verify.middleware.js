import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  const token = req.cookies.resumeToken;

  if (!token) {
    // In development mode, allow requests without token
    // Remove this in production for better security
    if (process.env.NODE_ENV === "development") {
      req.userId = "6a963402b2b69a3cae30654a";
      req.role = "user";
      req.email = "ranfeche@gmail.com";
      return next();
    }
    return res.status(401).json({ status: "error", message: "Unauthorized - No token provided" });
  }

  // console.log(process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    req.email = decoded.email;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
  }
};
