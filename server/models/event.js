// 1. create event schema
// 2. link to post schema via virtual (https://mongoosejs.com/docs/populate.html#populate-virtuals)
// 3. create event routes
// 4. make route for following feed (also figure out incorporating event post into it)

const mongoose = require("mongoose");
var idValidator = require("mongoose-id-validator");
var Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    attending: [
      {
        type: Schema.Types.ObjectId,
        ref: "EventAttend",
      },
    ],
    // location: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    //   minlength: 1,
    //   maxlength: 100,
    // },
  },
  { timestamps: true }
);

eventSchema.plugin(idValidator);

// eventSchema.virtual("attendingUsers", {
//   ref: "EventAttend",
//   localField: "attending",
//   foreignField: "_id",
// });

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
