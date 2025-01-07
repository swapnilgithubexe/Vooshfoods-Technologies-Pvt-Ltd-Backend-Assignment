import express from "express";
import { auth } from "../middlewares/auth.js"
import { deleteArtist, getAllArtists, getSingleArtist, updateArtist } from "../controllers/artist.controller.js";

export const artistRouter = express.Router();
artistRouter.get("/", auth, getAllArtists);
artistRouter.get("/:id", auth, getSingleArtist);
artistRouter.put("/:id", auth, updateArtist);
artistRouter.delete("/:id", auth, deleteArtist);
