import express from "express";
import { login, signUp } from "../controllers/user.controller.js";

export const userRouter = express.Router();

//routes
userRouter.post("/signup", signUp);
userRouter.post("/login", login);