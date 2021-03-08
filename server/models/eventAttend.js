const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const eventAttendSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

eventAttendSchema.plugin(idValidator);

const EventAttend = mongoose.model("EventAttend", eventAttendSchema);

module.exports = { EventAttend };
