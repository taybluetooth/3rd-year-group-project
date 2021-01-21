const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const repliesSchema = Schema(
  {
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    replyID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

repliesSchema.plugin(idValidator);

const Replies = mongoose.model("Replies", repliesSchema);

module.exports = { Replies };
