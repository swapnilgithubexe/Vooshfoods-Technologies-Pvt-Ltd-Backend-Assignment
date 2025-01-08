import express from "express";
import { addTrack, getAllTracks, getSingleTrack } from "../controllers/track.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js"

export const trackRouter = express.Router();

trackRouter.get("/", auth, getAllTracks);
trackRouter.get("/:id", auth, getSingleTrack);
trackRouter.post("/add-new-track", auth, isAdmin(["admin", "editor"]), addTrack);
