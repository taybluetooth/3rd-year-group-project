const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const followsSchema = Schema(
  {
    followerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followedID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

followsSchema.plugin(idValidator);

const Follows = mongoose.model("Follows", followsSchema);

module.exports = { Follows };
