import { tryCatchFunction } from "../middlewares/tryCatch.middleware.js";
import track from "../models/trackModel.js";

//Get all tracks
export const getAllTracks = tryCatchFunction(async (req, res, next) => {
  const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;

  if (!artist_id) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Artist not found, not valid artist_id",
      error: null
    });
  };
  if (!album_id) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: "Album not found, not valid album_id",
      error: null
    });
  };

  const trackQuery = {};
  if (artist_id !== undefined) {
    trackQuery.artist = artist_id;
  }

  if (album_id !== undefined) {
    trackQuery.album = album_id;
  }
  if (hidden !== undefined) {
    trackQuery.hidden = hidden === "true";
  };

  const tracks = await track.find(trackQuery).skip(parseInt(offset)).limit(parseInt(limit)).populate("artist").populate("album");

  if (!tracks) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Resource not found",
      error: null
    });
  };

  return res.status(200).json({
    status: 200,
    data: tracks,
    message: "Tracks fetched successfully",
    error: null
  })
});

//Get a single track
export const getSingleTrack = tryCatchFunction(async (req, res, next) => {
  const singleTrack = await track.findById(req.params.id).populate("artist").populate("album");

  if (!singleTrack) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: "Rescource doesn't exist",
      error: null
    });
  };
  return res.status(200).json({
    status: 200,
    data: singleTrack,
    message: "Track retreived successfully",
    error: null
  });
});

//Add a new track
export const addTrack = tryCatchFunction(async (req, res, next) => {
  const newTrack = new track(req.body);
  await newTrack.save();

  return res.status(201).json({
    status: 201,
    data: null,
    message: "Track created successfully",
    error: null
  });
});

//update 