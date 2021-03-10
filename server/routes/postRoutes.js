const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { Post } = require("../models/post");
const multer = require("multer");
const { getUserFromToken } = require("../models/user");
const { getChannelFromUsername } = require("../models/channel");
const upload = multer();

cloudinary.config({
  cloud_name: "bluetooth",
  api_key: "171536158776577",
  api_secret: "xXv64nJhkSZcTKqjb0MEltxIsqc",
});

module.exports = (app) => {
  // get all posts
  app.get("/api/post", async (req, res) => {
    let posts = await Post.find();
    return res.status(200).send(posts);
  });

  app.get("/api/post/channel/:channelUsername", async (req, res) => {
    const { channelUsername } = req.params;
    const channel = await getChannelFromUsername(channelUsername);

    if (!channel) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    try {
      let posts = await Post.find({ channelID: channel._id })
        .populate({ path: "user", select: "_id username profileImage" })
        .exec();
      return res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }
  });

  // get posts by userID
  app.get("/api/post/:userID", async (req, res) => {
    const { userID } = req.params;
    console.log(userID);
    let posts = await Post.find({ userID: userID }).exec();

    if (!posts) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(200).send(posts);
  });

  // get post by postID
  app.get("/api/post/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    let post = await Post.find({_id: id}).exec();

    if (!post) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(200).send(post);
  });

  // upload a post
  app.post("/api/post", upload.none(), async (req, res) => {
    const { token, description, imageUrl, channelUsername = "" } = req.body;
    const { lat, lon } = req.query;
    let location = "London"; // static for now
    console.log({ token, description, channelUsername });
    console.log({ lat, lon });
    const { _id: userID } = await getUserFromToken(token);

    if (!userID)
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });

    let postObj = {
      userID,
      description,
      location,
    };

    if (channelUsername) {
      const channel = await getChannelFromUsername(channelUsername);

      if (!channel) {
        return res.status(401).send({
          error: true,
          message: "Something went wrong, please try again.",
        });
      }

      postObj.channelID = channel._id;
    }

    let post = await Post.create(postObj);
    cloudinary.uploader.upload(imageUrl, async function (error, result) {
      post.image = result.public_id;
      await post.save();
      console.log(result, error);
    });
    return res.status(201).send({
      error: false,
      post,
    });
  });

  // update a post
  app.put("/api/post/:id", async (req, res) => {
    const { id } = req.params;
    let post = await Post.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      post,
    });
  });

  // delete a post
  app.delete("/api/post/:id", async (req, res) => {
    const { id } = req.params;
    let post = await Post.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      post,
    });
  });

  app.get("/api/feed/:userID", async (req, res) => {
    const userID = req.params.userID;
    const following = await Follows.find({ followerID: userID }).select(
      "followedID"
    );
    console.log(following);
    let users = [];
    following.forEach(({ followedID }) => users.push(followedID));
    console.log(users);

    const post = await Post.find({})
      .where("userID")
      .in(users)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "event",
        populate: {
          path: "attending",
          select: "eventID userID",
        },
      })
      .exec();
    console.log(post);
    return res.status(200).send({ post });
    // return res.send(following);
  });
};
