const mongoose = require("mongoose");
const { Channel } = require("../models/channel");
const cloudinary = require("cloudinary").v2;
const { User } = require("../models/user");
const { getChannelFromUsername } = require("../models/channel");
const { getUserFromToken, getUserFromUsername } = require("../models/user");

// const User = mongoose.model("User");
// const { generateToken } = require("../token");
// const {
//   createHash,
//   validateUserLogin,
//   validateUserSignup,
//   getUserFromUsername,
//   getUserFromToken,
// } = require("../models/user");

module.exports = (app) => {
  app.post("/api/channel", async (req, res) => {
    // LATER: add more strict validation

    const { token, displayName, username } = req.body;

    let channel = await getChannelFromUsername(username);
    if (channel) {
      return res.status(401).send({
        error: true,
        message: "This username is taken, please try again.",
      });
    }

    let user = await getUserFromToken(token);
    if (!user) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }
    const userID = user._id;

    user = await getUserFromUsername(username);
    if (user) {
      return res.status(401).send({
        error: true,
        message: "This username is taken, please try again.",
      });
    }

    try {
      channel = await Channel.create({
        userID,
        displayName,
        username,
      });

      return res.status(201).send({
        error: false,
        channel,
      });
    } catch (error) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again",
      });
    }
  });

  app.get("/api/channel/username/:username", async (req, res) => {
    const { username } = req.params;
    const channel = await getChannelFromUsername(username);

    if (!channel) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(201).send({
      error: false,
      channel,
    });
  });

  // update a user's details by their ID
  app.post("/api/channel/:id", async (req, res) => {
    const { id } = req.params;
    let user = await Channel.findByIdAndUpdate(id, {
      bio: req.body.bio,
      displayName: req.body.displayName,
      username: req.body.username,
    });
    return res.status(202).send({
      error: false,
      user,
    });
  });

  app.post("/api/channel/profilepic/:id", async (req, res) => {
    const { id } = req.params;
    var dataURI = req.body.dataURI;
    var uploadStr = "" + dataURI;
    let user = null;
    let public_id = id + "pp" + Date.now();
    cloudinary.uploader.destroy(public_id, { invalidate: true });
    await cloudinary.uploader.upload(
      uploadStr,
      { public_id: public_id, overwrite: true },
      async function (error, result) {
        channel = await Channel.findByIdAndUpdate(id, {
          profileImage: public_id,
        });
        console.log(result, error);
      }
    );
    return res.status(202).send({
      error: false,
      // user,
      profileImage: public_id,
    });
  });
};
