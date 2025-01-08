import express from "express";
import { addTrack, getAllTracks, getSingleTrack, updateTrack } from "../controllers/track.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js"

export const trackRouter = express.Router();

trackRouter.get("/", auth, getAllTracks);
trackRouter.get("/:id", auth, getSingleTrack);
trackRouter.post("/add-new-track", auth, isAdmin(["admin", "editor"]), addTrack);
trackRouter.put("/update/:id", auth, isAdmin(["admin", "editor"]), updateTrack);