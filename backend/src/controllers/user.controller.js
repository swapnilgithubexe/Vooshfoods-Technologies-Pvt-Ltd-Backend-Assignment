import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js"

//Sign up endpoint
export const signUp = tryCatchFunction(async (req, res, next) => {
  const { email, password, role } = req.body;
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(409).json({
      message: "Email already exists"
    });
  }

  const user = new User({
    email, password, role
  });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY
  });
  res.status(201).json({
    token,
    message: "User created successfully."
  })
  next();
});