const mongoose = require("mongoose");
const User = mongoose.model("User");
const { generateToken } = require("../token");
const {
  createHash,
  validateUserLogin,
  validateUserSignup,
} = require("../models/user");
const { getUserFromToken } = require("../models/user");

module.exports = (app) => {

  app.get("/api/user", async (req, res) => {
    let users = await User.find();
    return res.status(200).send(users);
  });

  // get specific user by tokenised ID.
  app.get("/api/user/:token", async (req, res) => {
    const { token } = req.params;
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(201).send({
      error: false,
      user,
    });
  });

  // create a user
  app.post("/api/user", async (req, res) => {
    let user = await User.create(req.body);
    return res.status(201).send({
      error: false,
      user,
    });
  });

  // user authentication by login
  app.post("/api/user/login", async (req, res) => {
    // LATER: Add more rigorous validation
    console.dir(req.body);
    const { username, password } = req.body;
    const { error } = validateUserLogin({ username, password });
    if (error) {
      console.dir(error);
      return res
        .status(401)
        .send({ error: true, message: error.details[0].message });
    }

    let user;
    try {
      user = await User.findOne({ username });
    } catch {
      user = null;
    }

    if (!user)
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });

    let hashedPassword = createHash(password, user._id);

    if (user.password !== hashedPassword)
      return res.status(401).send({
        error: true,
        message: "Login combination failed, please try again.",
      });

    return res.status(201).send({
      error: false,
      user,
      token: generateToken(user._id),
    });
  });

  // sign a user up to the system
  app.post("/api/user/signup", async (req, res) => {
    console.dir(req.body);
    const { username, password, displayName, email } = req.body;
    const { error } = validateUserSignup({
      username,
      password,
      displayName,
      email,
    });
    if (error) {
      console.dir(error);
      return res
        .status(401)
        .send({ error: true, message: error.details[0].message });
    }

    let user = await User.findOne().or([{ email }, { username }]);

    if (user)
      return res.status(401).send({
        error: true,
        message: "Login combination failed, please try again.",
      });

    try {
      user = await User.create({ username, password, displayName, email });
    } catch (err) {
      console.error(err);
      return res.status(401).send({
        error: true,
        message: "Something went wrong, please try again.",
      });
    }

    return res.status(201).send({
      error: false,
      user,
      token: generateToken(user._id),
    });
  });


  // update a user's details by their ID
  app.put("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      user,
    });
  });


  // delete a user by their ID
  app.delete("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      user,
    });
  });
};
