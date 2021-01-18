const mongoose = require("mongoose");
const Joi = require("joi");
const forge = require("node-forge");
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

const UserSchema = Schema({
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
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  // e.g. admin etc
  userType: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);

function validateUserLogin(user) {
  const schema = Joi.object({
    // email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().required(), //.pattern(new RegExp('...')) LATER: Decide on password regex pattern
    username: Joi.string().min(5).max(15).required(),
  });

  return schema.validate(user);
}

module.exports = { User, createHash, validateUserLogin };
