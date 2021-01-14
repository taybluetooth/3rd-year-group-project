const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema({
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
