import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { getAllUsers } from "../controllers/admin.controller.js"


export const adminRouter = express.Router();

//Routes
adminRouter.get("/users", auth, isAdmin(["admin"]), getAllUsers);