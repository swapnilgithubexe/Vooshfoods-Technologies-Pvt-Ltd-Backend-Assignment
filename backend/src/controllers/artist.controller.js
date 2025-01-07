import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js";
import artist from "../models/artistModel.js";

//get all artists
export const getAllArtists = tryCatchFunction(async (req, res, next) => {
  const { limit = 5, offset = 0, grammy, hidden } = req.query;
  const artistQuery = {};

  if (grammy !== undefined) {
    artistQuery.grammy = parseInt(grammy);
  }

  if (hidden !== undefined) {
    artistQuery.hidden = Boolean(hidden);
  }

  const artists = await artist.find(artistQuery).skip(parseInt(offset)).limit(parseInt(limit));

  res.status(200).json({
    status: 200,
    data: artists,
    message: "Artist retrieved successfully!",
    error: null
  });
});

//get single artist
export const getSingleArtist = tryCatchFunction(async (req, res, next) => {
  const singleArtist = await artist.findById(req.params.id);
  if (!artist) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Artist not found",
      error: null
    });
  }
  res.status(200).json({
    status: 200,
    data: singleArtist,
    message: "Artist retrieved suuccessfully",
    error: null
  });
});

//create a new artist
export const createArtist = tryCatchFunction(async (req, res, next) => {
  const newArtist = new artist(req.body);
  await newArtist.save();
  res.status(201).json({
    status: 201,
    data: null,
    message: "Artist created successfully",
    error: null
  });
});

//updating the artist
export const updateArtist = tryCatchFunction(async (req, res, next) => {
  const existingArtist = await artist.findByIdAndUpdate(
    req.params.id,
    req.body
  )
  if (!existingArtist) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Artist not found",
      error: null
    })
  }
  res.status(204).json();
});

//delete an artist
export const deleteArtist = tryCatchFunction(async (req, res, next) => {
  const existingArtist = await artist.findByIdAndDelete(req.params.id);
  if (!existingArtist) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Artist not found",
      error: null
    });
  };
  res.status(200).json({
    status: 200,
    data: null,
    message: "Artist deleted successfully",
    error: null
  });
});