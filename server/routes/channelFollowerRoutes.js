const mongoose = require("mongoose");
const User = mongoose.model("User");
const { ChannelFollows } = require("../models/channelFollows");
const { generateToken } = require("../token");
const { getUserFromUsername, getUserFromToken } = require("../models/user");
const { getChannelFromUsername } = require("../models/channel");

module.exports = (app) => {
  app.post("/api/follow/channel/", async (req, res) => {
    // console.dir(req.body);
    const { token, followingUsername } = req.body;

    const follower = await getUserFromToken(token);
    const followed = await getChannelFromUsername(followingUsername);

    if (!follower || !followed) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    let follow = null;
    try {
      follow = await ChannelFollows.findOne({
        followerID: follower._id,
        followedID: followed._id,
      });

      if (follow)
        return res.status(201).send({
          error: false,
          follow,
        });

      follow = await ChannelFollows.create({
        followerID: follower._id,
        followedID: followed._id,
      });

      follower.numFollowing++;
      followed.numFollows++;
      await follower.save();
      await followed.save();

      console.log({ follower, followed });
    } catch (error) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(201).send({
      error: false,
      follow,
    });
  });

  app.post("/api/unfollow/channel/", async (req, res) => {
    // console.dir(req.body);
    const { token, followingUsername } = req.body;

    const follower = await getUserFromToken(token);
    const followed = await getChannelFromUsername(followingUsername);

    if (!follower || !followed) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    let follow = null;
    try {
      follow = await ChannelFollows.findOne({
        followerID: follower._id,
        followedID: followed._id,
      });

      if (!follow) throw new Error();

      follower.numFollowing--;
      followed.numFollows--;
      await follower.save();
      await followed.save();
      await follow.deleteOne();

      console.log({ follower, followed });
    } catch (error) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(201).send({
      error: false,
      follow,
    });
  });

  app.get("/api/follow/channel/:token/:followingUsername", async (req, res) => {
    console.dir(req.params);
    const { token, followingUsername } = req.params;

    const follower = await getUserFromToken(token);
    const followed = await getChannelFromUsername(followingUsername);

    let follow = null;
    try {
      follow = await ChannelFollows.findOne({
        followerID: follower._id,
        followedID: followed._id,
      });

      return res.status(201).send({
        error: false,
        isFollowing: follow ? true : false,
      });
    } catch (error) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }
  });
};
