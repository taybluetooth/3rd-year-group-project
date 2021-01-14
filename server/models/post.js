const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const postSchema = Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true,
    default: 'image'
  },
  date: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
  likes: {
    type: Number,
    default: 0,
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
    type: Number,
    default: 0,
  },
  achievement: {
    type: String,
    default: 'tester',
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
