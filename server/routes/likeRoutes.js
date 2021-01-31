const mongoose = require("mongoose");
const User = mongoose.model("User");
const { Likes } = require("../models/likes");
const { generateToken } = require("../token");
const { getUserFromToken } = require("../models/user");

module.exports = (app) => {
  app.post("/api/like", async (req, res) => {

    const { token, likedPost } = req.body;
    const user = await getUserFromToken(token);
    const userID = user.userID;
    const postID = likedPost._id;

    like = await Likes.create({ userID, postID });

    console.log("Post Liked");

    return res.status(201).send({
      error: false,
      like,
    });
  });
};
