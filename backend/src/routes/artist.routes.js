import express from "express";
import { auth } from "../middlewares/auth.js"
import { getAllArtists } from "../controllers/artist.controller.js";

export const artistRouter = express.Router();
artistRouter.get("/", auth, getAllArtists);
