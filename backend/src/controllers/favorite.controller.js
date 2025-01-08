import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js"
import favorite from "../models/favoriteModel.js";

//get favorite
export const getFavorite = tryCatchFunction(async (req, res, next) => {

  const { category } = req.query;
  const favorites = await favorite.find({ user: req.user._id, category }).skip(parseInt(req.query.offset || 0)).limit(parseInt(req.query.limit || 5));

  res.status(200).json({
    status: 200,
    data: favorites,
    message: "Favorites retrieved successfully",
    error: null
  });
});

//add to favorites
export const addFavorite = tryCatchFunction(async (req, res, next) => {
  const newFavorite = new favorite(req.body);
  await newFavorite.save();
  return res.status(201).json({
    status: 201,
    data: null,
    message: "Favorite added successfully",
    error: null
  });
});

//Remove from favorites
export const removeFavorites = tryCatchFunction(async (req, res, next) => {
  const removedFavoriteItem = await favorite.findByIdAndDelete({ _id: req.params.id, user: req.user._id });
  if (!removedFavoriteItem) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Resource doesn't exist",
      error: null
    });
  };
  return res.status(200).json({
    status: 200,
    data: null,
    message: "Favorite removed successfully",
    error: null
  });
});