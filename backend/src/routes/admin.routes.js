import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { addNewUser, deleteUser, getAllUsers } from "../controllers/admin.controller.js"


export const adminRouter = express.Router();

//Routes
adminRouter.get("/users", auth, isAdmin(["admin"]), getAllUsers);
adminRouter.post("/add-new-user", auth, isAdmin(["admin"]), addNewUser);
adminRouter.delete("/users/:id", auth, isAdmin(["admin"]), deleteUser);