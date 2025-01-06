import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized"
    });
  }
}

export const isAdmin = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(401).json({
      status: 401,
      data: null,
      message: "Unauthorized Access",
      error: null
    });
  }
  next();

}

export const generateToken = (user) => {
  return jwt.sign({
    id: user._id, role: user.role
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY
  });
}