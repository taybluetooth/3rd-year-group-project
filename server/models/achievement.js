const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AchievementSchema = new Schema({
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
  },
});

const Achievement = mongoose.model("Achievement", AchievementSchema);

module.exports = { Achievement };
