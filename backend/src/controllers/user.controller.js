import User from "../models/user.model.js";

export const me = async (req, res) => {
  const userId = req.userId || "6a963402b2b69a3cae30654a";
  try {
    // check user if exist

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const user = await User.findById(userExists._id).select(
      "username email role lastLogin",
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
