const mongoose = require("mongoose");
const User = mongoose.model("User");
const { createHash, validateUserLogin } = require("../models/user");

module.exports = (app) => {
  app.get("/api/user", async (req, res) => {
    let users = await User.find();
    return res.status(200).send(users);
  });

  app.post("/api/user", async (req, res) => {
    let user = await User.create(req.body);
    return res.status(201).send({
      error: false,
      user,
    });
  });

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

    let user = await User.findOne({ username });

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
    });
  });

  app.post("/api/user/signup", async (req, res) => {
    // let user = await User.create(req.body);
    // return res.status(201).send({
    //   error: false,
    //   user,
    // });
    console.dir(req.body);
    res.status(401).send({ message: "Error!" });
  });

  app.put("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      user,
    });
  });

  app.delete("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    return res.status(202).send({
      error: false,
      user,
    });
  });
};
