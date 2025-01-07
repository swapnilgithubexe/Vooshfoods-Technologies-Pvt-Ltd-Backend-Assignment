import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grammy: {
    type: Boolean,
    required: false,

  },
  hidden: {
    type: Boolean,
    required: false
  }
}, { timestamps: true });

const artist = mongoose.model("Artist", ArtistSchema);
export default artist;