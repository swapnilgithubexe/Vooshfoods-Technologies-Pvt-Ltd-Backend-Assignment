import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js"
import { getAllAlbums, getSingleAlbum } from "../controllers/album.controller.js";


export const albumRouter = express.Router();

//Routes
albumRouter.get("/", auth, getAllAlbums)
albumRouter.post("/:id", auth, getSingleAlbum);