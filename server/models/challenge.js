const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const challenge = mongoose.model("challenges", challengeSchema);

module.exports = { challenge };
