import express from "express";
import { login, signUp, updatePassword } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

export const userRouter = express.Router();

//routes
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/update-password", auth, updatePassword);