const mongoose = require("mongoose");
const Joi = require("joi");
var Schema = mongoose.Schema;

const channelSchema = new Schema(
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
    numFollows: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String,
      default: "default-img",
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);

async function getChannelFromUsername(username) {
  try {
    const channel = await Channel.findOne({ username });
    return channel;
  } catch (error) {
    return null;
  }
}

module.exports = { Channel, getChannelFromUsername };
