const mongoose = require("mongoose");
const Joi = require("joi");
const forge = require("node-forge");

// Create the password hash
function createHash(password, salt) {
  var md = forge.md.sha256.create();
  md.update(password + salt);
  return md.digest().toHex();
}

function setPassword(password) {
  return createHash(password, this._id);
}

const userSchema = mongoose.Schema({
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
    maxlength: 256,
    set: setPassword, // hash the password before it's stored in the db
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 40,
    unique: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  // e.g. admin etc
  userType: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
