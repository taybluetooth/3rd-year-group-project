const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Post = mongoose.model("Post");
const multer = require("multer");
const { getUserFromToken } = require("../models/user");
const upload = multer();
const navigate = require('navigator');

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

  // upload a post
  app.post("/api/post", upload.none(), async (req, res) => {
    const { token, description, imageUrl } = req.body;
    const { lat, lon } = req.query;
    console.log({ token, description });
    console.log({ lat, lon });
    const { _id: userID } = await getUserFromToken(token);

    if (!userID)
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });

    let location = "London"; // static for now

    let post = await Post.create({ userID, description, location });
    cloudinary.uploader.upload(imageUrl, function (error, result) {
      post.image = result.public_id;
      post.save();
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
};
