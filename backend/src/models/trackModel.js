import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artist",
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "album",
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const track = mongoose.model("Track", TrackSchema);
export default track;