const mongoose = require("mongoose");
const Joi = require("joi");
var Schema = mongoose.Schema;

const channelSchema = Schema(
  {
    displayName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 70,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
      unique: true,
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);

module.exports = { Channel };
