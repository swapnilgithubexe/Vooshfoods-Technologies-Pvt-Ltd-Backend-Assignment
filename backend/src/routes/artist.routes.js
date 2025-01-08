import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js"
import { addArtist, deleteArtist, getAllArtists, getSingleArtist, updateArtist } from "../controllers/artist.controller.js";

export const artistRouter = express.Router();
artistRouter.get("/", auth, getAllArtists);
artistRouter.get("/:id", auth, getSingleArtist);
artistRouter.post("/add-artist", auth, isAdmin(["admin", "editor"]), addArtist)
artistRouter.put("/:id", auth, isAdmin(["admin", "editor"]), updateArtist);
artistRouter.delete("/:id", auth, isAdmin(["admin", "editor"]), deleteArtist);
