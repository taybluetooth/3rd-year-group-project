const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { User } = require("./models/user");
const { Post } = require("./models/post");
const { Achievement } = require("./models/achievement");
const dbConfig = require("./database/db.js");
const { getUserFromToken } = require("./models/user");
require("dotenv/config");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Make sure it comes back as json

// importing routes
require("./routes/userRoutes")(app);
require("./routes/postRoutes")(app);
require("./routes/achievementRoutes")(app);
require("./routes/followerRoutes")(app);

app.get("/api/verifyToken/:token", async (req, res) => {
  const token = req.params.token;
  const user = await getUserFromToken(token);

  if (!user)
    return res.status(401).send({
      error: true,
      message: "This token is not valid, please try again.",
    });

  const { displayName, username, email, _id } = user;

  return res.status(201).send({
    error: false,
    user: { displayName, username, email, _id },
  });
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Connecting to flock cluster database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );
mongoose.set("useCreateIndex", true);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server running at ${
      process.env.NODE_ENV !== "production" ? "http://localhost:" : ""
    }${port}`
  )
);
