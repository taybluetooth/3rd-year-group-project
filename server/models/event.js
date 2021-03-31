const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    attending: [
      {
        type: Schema.Types.ObjectId,
        ref: "EventAttend",
      },
    ],
    numAttending: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

eventSchema.plugin(idValidator);

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
