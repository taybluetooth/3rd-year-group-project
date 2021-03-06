const mongoose = require("mongoose");
const Joi = require("joi");
const forge = require("node-forge");
const { getIDFromToken } = require("../token");
const { func } = require("joi");
var Schema = mongoose.Schema;

// Create the password hash
function createHash(password, salt) {
  var md = forge.md.sha256.create();
  md.update(password + salt);
  return md.digest().toHex();
}

function setPassword(password) {
  return createHash(password, this._id);
}

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 70,
    },
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type:String,
      default: "default-img",
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
      unique: true,
    },
    numFollows: {
      type: Number,
      default: 0,
    },
    numFollowing: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 75,
      set: setPassword, // hash the password before it's stored in the db
    },
    verified: {
      type: Boolean,
      default: false,
    },
    challenge: {
      type: Array,
      default: [],
    },
    points: {
      type: Number,
      default: 0,
    },
    // e.g. admin etc
    userType: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

function validateUserLogin(user) {
  const schema = Joi.object({
    // email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().required(), //.pattern(new RegExp('...')) LATER: Decide on password regex pattern
    username: Joi.string().min(5).max(15).required(),
  });

  return schema.validate(user);
}

function validateUserSignup(user) {
  const schema = Joi.object({
    displayName: Joi.string().min(1).max(70).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().required(), //.pattern(new RegExp('...')) LATER: Decide on password regex pattern
    username: Joi.string().min(5).max(15).required(),
  });

  return schema.validate(user);
}

async function getUserFromToken(token) {
  try {
    const _id = getIDFromToken(token);
    const user = await User.findOne({ _id });
    return user;
  } catch (error) {
    return null;
  }
}

async function getUserFromUsername(username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    return null;
  }
}

module.exports = {
  User,
  createHash,
  validateUserLogin,
  validateUserSignup,
  getUserFromToken,
  getUserFromUsername,
};
