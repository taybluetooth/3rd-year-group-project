const mongoose = require("mongoose");
const User = mongoose.model("User");
const { Likes } = require("../models/likes");
const { generateToken } = require("../token");
const { getUserFromToken } = require("../models/user");

module.exports = (app) => {
  app.post("/api/like/", async (req, res) => {

    const { token, likedPost } = req.body;
    const user = await getUserFromToken(token);
    const userID = user.userID;
    const postID = likedPost._id;

    if (!user || !likedPost) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    let like = null;
    try {
      like = await Likes.findOne({
        userID: userID,
        postID: postID,
      });

      if (like)
        return res.status(201).send({
          error: false,
          like,
        });

      like = await Likes.create({ userID, postID });

      likedPost.likes++;
      await likedPost.save();
    } catch (error) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(201).send({
      error: false,
      like,
    });
  });
};
