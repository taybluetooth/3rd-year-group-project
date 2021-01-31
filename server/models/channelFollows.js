const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const channelFollowsSchema = new Schema(
  {
    followerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followedID: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
  },
  { timestamps: true }
);

channelFollowsSchema.plugin(idValidator);

const ChannelFollows = mongoose.model("ChannelFollows", channelFollowsSchema);

module.exports = { ChannelFollows };
