const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const mentionsSchema = Schema(
  {
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: "true" }
);

mentionsSchema.plugin(idValidator);

const Mentions = mongoose.model("Mentions", mentionsSchema);

module.exports = { Mentions };
