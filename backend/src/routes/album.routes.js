import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js"
import { addAlbum, deleteAlbum, getAllAlbums, getSingleAlbum, updateAlbum } from "../controllers/album.controller.js";


export const albumRouter = express.Router();

//Routes
albumRouter.get("/", auth, getAllAlbums)
albumRouter.post("/:id", auth, getSingleAlbum);
albumRouter.post("/add-new-album", auth, isAdmin(["admin", "editor"]), addAlbum);
albumRouter.post("/update/:id", auth, isAdmin(["admin", "auth"]), updateAlbum);
albumRouter.delete("/delete/:id", auth, isAdmin(["admin", "editor"]), deleteAlbum);