const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channelID: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    location: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    // achievement: {
    //   type: String,
    //   default: "tester",
    // },
  },
  { timestamps: true }
);

postSchema.plugin(idValidator);

postSchema.virtual("user", {
  ref: "User",
  localField: "userID",
  foreignField: "_id",
  justOne: true,
});

postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
