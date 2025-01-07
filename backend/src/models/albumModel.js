import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artist",
      required: true,
    },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const album = mongoose.model("Album", AlbumSchema);
export default album;
