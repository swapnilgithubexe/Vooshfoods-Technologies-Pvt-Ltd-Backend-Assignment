import express from "express";
import { signUp } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

export const userRouter = express.Router();

//routes
userRouter.post("/signup", signUp);