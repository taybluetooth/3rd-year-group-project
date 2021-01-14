const mongoose = require("mongoose");
var cloudinary = require("cloudinary").v2;
const Post = mongoose.model("Post");
var multer = require("multer");
var upload = multer();

cloudinary.config({
  cloud_name: "bluetooth",
  api_key: "171536158776577",
  api_secret: "xXv64nJhkSZcTKqjb0MEltxIsqc",
});

module.exports = (app) => {
  app.get("/api/post", async (req, res) => {
    let posts = await Post.find();
    return res.status(200).send(posts);
  });

  // Hard coded user id for now
  // Change this later
  app.post("/api/post", upload.none(), async (req, res) => {
    console.log(req.body);
    let testUserId = "60003a0dc79ff410189a1265";
    let description = req.body.text;
    let location = "London";
    let post = await Post.create({ user: testUserId, description, location });
    cloudinary.uploader.upload(req.body.imageUrl, function (error, result) {
      post.image = result.public_id;
      post.save();
      console.log(result, error);
    });
    return res.status(201).send({
      error: false,
      post,
    });
  });

  app.put("/api/post/:id", async (req, res) => {
    const { id } = req.params;
    let post = await Post.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      post,
    });
  });

  app.delete("/api/post/:id", async (req, res) => {
    const { id } = req.params;
    let post = await Post.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      post,
    });
  });
};
