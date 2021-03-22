const mongoose = require("mongoose");
const User = mongoose.model("User");
const { Event } = require("../models/event");
const { EventAttend } = require("../models/eventAttend");
const { Post } = require("../models/post");

module.exports = (app) => {
  app.post("/api/event/attend", async (req, res) => {
    const { eventID = "", userID = "" } = req.body;

    if (eventID === "" || userID === "") {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    let eventAttend = await EventAttend.findOne({ eventID, userID });
    if (eventAttend)
      return res.status(400).send({
        error: true,
        message: "User is already attending this event.",
      });

    eventAttend = await EventAttend.create({ eventID, userID });
    // const eventID = eventAttend.eventID;
    const event = await Event.findOne({ _id: eventID });

    event.attending.push(eventAttend._id);
    event.numAttending++;
    await event.save();
    console.log({ eventAttend, event });
    return res.status(200).send({ eventAttend, event });
  });

  app.post("/api/event/unattend", async (req, res) => {
    const { eventID = "", userID = "" } = req.body;

    if (eventID === "" || userID === "") {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    let eventAttend = await EventAttend.findOne({ eventID, userID });
    if (!eventAttend)
      return res.status(400).send({
        error: true,
        message: "This user isn't attending this event.",
      });

    const event = await Event.findOne({ _id: eventID });
    event.numAttending--;
    event.attending.pull(eventAttend._id);
    await eventAttend.deleteOne();
    await event.save();
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

  app.get("/api/event", async (req, res) => {
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
