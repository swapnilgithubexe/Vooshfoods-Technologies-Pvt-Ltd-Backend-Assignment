import express from "express";
import { addFavorite, getFavorite, removeFavorites } from "../controllers/favorite.controller.js";
import { auth } from "../middlewares/auth.js"

export const favoriteRouter = express.Router();

favoriteRouter.get("/", auth, getFavorite);
favoriteRouter.post("/add-favorite", auth, addFavorite);
favoriteRouter.delete("/remove-favorite/:id", auth, removeFavorites);