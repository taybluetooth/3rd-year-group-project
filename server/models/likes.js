const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const likesSchema = Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: "true" }
);

likesSchema.plugin(idValidator);

const Likes = mongoose.model("Likes", likesSchema);

module.exports = { Likes };
