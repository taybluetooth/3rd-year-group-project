const mongoose = require("mongoose");
const User = mongoose.model("User");
const { Post } = require("../models/post");
const { Likes } = require("../models/likes");
const { generateToken } = require("../token");
const { getUserFromToken } = require("../models/user");

module.exports = (app) => {
  app.post("/api/like", async (req, res) => {

    const { token, likedPost } = req.body;
    const user = await getUserFromToken(token);
    const userID = user._id;
    const postID = likedPost._id;

    if (!user || !likedPost) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    const likeExist = await Likes.findOne({ userID: userID, postID: postID }).select("_id").lean();

    if(!likeExist) {
      like = await Likes.create({ userID, postID });
      likedPost.likes++;
      let post = likedPost
      post = await Post.findByIdAndUpdate(post._id, post);
      console.log(user.username + " Liked Post ID: " + postID);

      return res.status(201).send({
        error: false,
        like,
      });
    }
    else {
      let unlike = await Likes.findOneAndDelete({ userID: userID, postID: postID });
      likedPost.likes--;
      let post = likedPost
      post = await Post.findByIdAndUpdate(post._id, post);
      console.log(user.username + " Unliked Post ID: " + postID);
      return res.status(201).send({
        error: false,
        unlike,
      });
    }
  });

  app.get("/api/like/:postID/:token", async (req, res) => {
    const { postID, token } = req.params;
    const user = await getUserFromToken(token);
    let like = await Likes.findOne({ userID: user._id, postID: postID }).select("_id").lean();

    if (!like) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(200).send({
      isLiked: like ? true : false,
    });
  });
};
