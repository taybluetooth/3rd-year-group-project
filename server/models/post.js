const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const postSchema = Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channelID: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
    image: {
      type: String,
    },
    // likes: {
    //   type: Number,
    //   default: 0,
    // },
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
    // points: {
    //   type: Number,
    //   default: 0,
    // },
    // achievement: {
    //   type: String,
    //   default: "tester",
    // },
  },
  { timestamps: "true" }
);

postSchema.plugin(idValidator);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
