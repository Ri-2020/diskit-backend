import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  videoId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  keywords: {
    type: Array,
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
  },
  uploadedDate: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  link: {
    type: String,
    trim: true,
    unique: true,
  },
  channel: {
    type: {
      id: {
        type: String,
      },
      name: String,
      link: { type: String },
      verified: Boolean,
      thumbnail: String,
    },
    trim: true,
  },
  views: {
    type: Number,
  },
  duration: {
    type: Number,
  },
});

const VideoModel = mongoose.model("video", videoSchema);

export default VideoModel;
