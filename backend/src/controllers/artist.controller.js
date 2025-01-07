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
