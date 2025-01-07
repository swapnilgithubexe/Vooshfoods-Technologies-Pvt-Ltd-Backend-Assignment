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

//add an album
export const addAlbum = tryCatchFunction(async (req, res, next) => {
  const newAlbum = new album(req.body);
  await album.save();
  return res.status(201).json({
    status: 201,
    data: null,
    message: "Album created successfully",
    error: null
  })
})

//update an album
export const updateAlbum = tryCatchFunction(async (req, res, next) => {
  const updatedAlbum = await album.findByIdAndUpdate(req.params.id, req.body);
  if (!updatedAlbum) {
    res.status(404).json({
      status: 404,
      data: null,
      message: "Resource not found",
      error: null
    });
  };
  res.status(204).json({
    status: 204,
    data: null,
    message: "Album updated successfully",
    error: null
  });
});

//delete an album
export const deleteAlbum = tryCatchFunction(async (req, res, next) => {
  const deletedAlbum = await album.findByIdAndDelete(req.params.id);
  if (!deletedAlbum) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Rescource doesn't exist",
      error: null
    })
  }

  res.status(200).json({
    status: 200,
    data: null,
    message: "Album creadted successfully",
    error: null
  });
});