const mongoose = require("mongoose");
const { Channel } = require("../models/channel");
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
};
