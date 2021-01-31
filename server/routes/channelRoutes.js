const mongoose = require("mongoose");
const { Channel } = require("../models/channel");
const { getChannelFromUsername } = require("../models/channel");

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
    const channel = await Channel.create(req.body);
    return res.status(200).send(channel);
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
