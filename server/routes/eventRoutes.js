const mongoose = require("mongoose");
const User = mongoose.model("User");
const { Event } = require("../models/event");
const { EventAttend } = require("../models/eventAttend");
const { Post } = require("../models/post");

module.exports = (app) => {
  // app.post("/api/event", async (req, res) => {
  //   const post = await Post.create(req.body.post);
  //   const postID = post._id;
  //   const event = await Event.create({ ...req.body.event, postID });
  //   post.eventID = event._id;
  //   await post.save();
  //   console.log({ post, event });
  //   return res.status(200).send({ post, event });
  // });

  app.post("/api/event-attend", async (req, res) => {
    const eventAttend = await EventAttend.create(req.body);
    const eventID = eventAttend.eventID;
    const event = await Event.findOne({ _id: eventID });
    event.attending.push(eventAttend._id);
    event.save();
    console.log({ eventAttend, event });
    return res.status(200).send({ eventAttend, event });
  });

  app.get("/api/event-attend/:eventID", async (req, res) => {
    const _id = req.params.eventID;
    const event = await Event.findOne({ _id })
      .populate({
        path: "attending",
      })
      .exec();
    console.log(event);
    return res.status(200).send({ event });
  });

  app.get("/api/event/", async (req, res) => {
    // const _id = req.params.postID;
    const post = await Post.find({})
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
  });
};
