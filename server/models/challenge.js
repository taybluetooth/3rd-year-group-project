const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = { Challenge };
