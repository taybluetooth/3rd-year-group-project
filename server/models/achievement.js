const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const achievementSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = { Achievement };
