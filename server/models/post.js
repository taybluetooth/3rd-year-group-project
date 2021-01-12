const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  likes: {
    type: Integer,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
  },
  points: {
    type: Integer,
  },
  achievement: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
