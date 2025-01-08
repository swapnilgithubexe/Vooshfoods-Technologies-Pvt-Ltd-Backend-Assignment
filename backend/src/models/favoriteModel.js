import mongoose from "mongoose";

const FavoriteModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
  },
  category: {
    type: String,
    enum: ["artist", "album", "track"],
    required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId, required: true
  }
}, { timestamps: true });

const favorite = mongoose.model("Favorites", FavoriteModel);
export default favorite;