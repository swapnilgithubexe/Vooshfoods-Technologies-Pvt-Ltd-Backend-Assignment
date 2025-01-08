import express from "express";
import { addTrack, deleteTrack, getAllTracks, getSingleTrack, updateTrack } from "../controllers/track.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js"

export const trackRouter = express.Router();

trackRouter.get("/", auth, getAllTracks);
trackRouter.get("/:id", auth, getSingleTrack);
trackRouter.post("/add-track", auth, isAdmin(["admin", "editor"]), addTrack);
trackRouter.put("/:id", auth, isAdmin(["admin", "editor"]), updateTrack);
trackRouter.delete("/:id", auth, isAdmin(["admin", "editor"]), deleteTrack);