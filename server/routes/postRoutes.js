const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { Post } = require("../models/post");
const { Event } = require("../models/event");
const { Follows } = require("../models/follows");
const { ChannelFollows } = require("../models/channelFollows");
const multer = require("multer");
const { getUserFromToken } = require("../models/user");
const { getChannelFromUsername } = require("../models/channel");
const upload = multer();
const cities = require("all-the-cities");

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

  app.get("/api/post/channel/:channelUsername/:userID", async (req, res) => {
    const { channelUsername, userID } = req.params;
    const channel = await getChannelFromUsername(channelUsername);

    if (!channel) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    try {
      let posts = await Post.find({ channelID: channel._id })
        .populate({
          path: "user",
          select: "-password",
        })
        .populate({
          path: "event",
          populate: {
            path: "attending",
            select: "eventID userID",
            match: { userID },
          },
        })
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
    let posts = await Post.find({ userID: userID })
      .populate({
        path: "event",
        populate: {
          path: "attending",
          select: "eventID userID",
          match: { userID },
        },
      })
      .exec();

    if (!posts) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(200).send(posts);
  });

  app.get("/api/post/:profileUserID/:currentUserID", async (req, res) => {
    const { profileUserID: userID, currentUserID } = req.params;
    let posts = await Post.find({ userID })
      .populate({
        path: "event",
        populate: {
          path: "attending",
          select: "eventID userID",
          match: { userID: currentUserID },
        },
      })
      .exec();

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
    let post = await Post.find({ _id: id }).exec();

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
    const {
      token,
      description,
      imageUrl,
      channelUsername = "",
      startDate,
      endDate,
      isEvent,
      location,
      lat,
      long,
    } = req.body;
    let tags = [];
    console.log({
      token,
      description,
      channelUsername,
      isEvent,
      startDate,
      endDate,
      location,
      lat,
      long,
    });
    const { _id: userID } = await getUserFromToken(token);

    if (!userID)
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });

    // const city = cities.find((city) => city.name.match(location));

    // if (!city)
    //   return res.status(401).send({
    //     error: true,
    //     message: "Sorry, this city couldn't be found, please try again.",
    //   });

    // const lat = city.loc.coordinates[1];
    // const long = city.loc.coordinates[0];
    // console.log({ city, lat, long });

    let postObj = {
      userID,
      description,
      location,
      lat,
      long,
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

    // TODO: uncomment for demo
    let post = await Post.create(postObj);
    let user = await getUserFromToken(token);
    let challenge = null;
    cloudinary.uploader.upload(
      imageUrl,
      { categorization: "google_tagging" },
      async function (error, result) {
        post.image = result.public_id;
        for (let i = 0; i < 5; i++) {
          tags[i] = result.info.categorization.google_tagging.data[i];
          if (tags[i].tag == user.challenge[0]) {
            challenge = user.challenge[0];
            post.points += user.challenge[2];
            user.points += user.challenge[2];
          }
        }
        post.tag = tags;
        await user.save();
        await post.save();
        console.log(result, error);
      }
    );

    let event = null;
    if (isEvent === "true") {
      const postID = post._id;
      event = await Event.create({ postID, startDate, endDate });
      post.eventID = event._id;
      await post.save();
      console.log({ post, event });
    }

    return res.status(201).send({
      error: false,
      post,
      event,
      challenge,
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
  app.delete("/api/post/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    let post = await Post.findByIdAndDelete(id);
    let user = await getUserFromToken(token);

    user.points -= post.points;
    user.save();

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
    const channelFollowing = await ChannelFollows.find({
      followerID: userID,
    }).distinct("followedID");

    if (!following) {
      res.status(200).send([]);
    }

    let users = [];
    following.forEach(({ followedID }) => users.push(followedID));
    console.log(users);

    const posts = await Post.find({})
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
          match: { userID },
        },
      })
      .exec();

    const otherPosts = await Post.find({})
      .where("channelID")
      .in(channelFollowing)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "event",
        populate: {
          path: "attending",
          select: "eventID userID",
          match: { userID },
        },
      })
      .exec();

    const post = [...posts, ...otherPosts];

    console.log(post);
    return res.status(200).send({ post });
  });
};
