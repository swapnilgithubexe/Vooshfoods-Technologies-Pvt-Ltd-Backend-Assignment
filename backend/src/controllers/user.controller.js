import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js"
import { generateToken } from "../middlewares/auth.js";

//Sign up endpoint
export const signUp = tryCatchFunction(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad request, Reason:${Missing Field}"
    })
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(409).json({
      status: 409,
      data: null,
      message: "Email already exists",
      error: null
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
    status: 201,
    data: null,
    message: "User created successfully.",
    error: null
  })
  next();
});

//login endpoint
export const login = tryCatchFunction(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "User not found",
      error: null
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request, Reason ${Missing Field}"
    });
  }

  const token = generateToken(user);
  res.status(200).json({
    status: 200,
    data: {
      token: token
    },
    message: "Login Successful",
    error: null
  })
});

//Update password
export const updatePassword = tryCatchFunction(async (req, res, next) => {
  const { old_password, new_password } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "User not found",
      error: null
    });
  }
  const isPasswordMatched = await user.comparePassword(old_password);
  if (!isPasswordMatched) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad Request",
      error: null
    });
  }
  user.password = new_password;
  await user.save();

  res.status(204).json();
})