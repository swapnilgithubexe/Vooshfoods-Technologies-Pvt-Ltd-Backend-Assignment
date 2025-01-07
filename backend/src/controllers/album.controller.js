import album from "../models/albumModel.js";
import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js"

//Get all albums
export const getAllAlbums = tryCatchFunction(async (req, res, next) => {
  const { limit = 5, offset = 0, artist_id, hidden } = req.query
  if (!artist_id) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Artist not found, not valid artist_id",
      error: null
    });
  };
  const albumQuery = {};
  if (artist_id !== undefined) {
    albumQuery[artist._id] = artist_id;
  };
  if (hidden !== undefined) {
    albumQuery.hidden = Boolean(hidden);
  };

  const albums = await album.find(albumQuery).skip(parseInt(offset)).limit(parseInt(limit));
  if (!albums) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Bad request",
      error: null
    });
  };

  res.status(200).json({
    status: 200,
    data: albums,
    message: "Album retrieved successfully",
    error: null
  });
});

//Get a single album
export const getSingleAlbum = tryCatchFunction(async (req, res, next) => {
  const singleAlbum = await album.findById(req.params.id).populate("artist");
  if (!singleAlbum) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Resource doesn't exist",
      error: null
    });
  };
  res.status(200).json({
    status: 200,
    data: singleAlbum,
    message: "Album retrieved suuccessfully",
    error: null
  });
});