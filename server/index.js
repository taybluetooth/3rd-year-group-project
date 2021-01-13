const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { User } = require("./models/user");
const { Post } = require("./models/post");
const dbConfig = require("./database/db.js");
require("dotenv/config");

const app = express();
console.log(process.env.DB_CONNECTION);

// importing routes
require("./routes/userRoutes")(app);
require("./routes/postRoutes")(app);

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

/* TESTING ROUTES FOR INSERTING ENTRIES INTO MONGODB
app.get("/usertest", async (req, res) => {
  const user = new User({ email: "test123@email.com", password: "hello123", username: "testing123", verified: false, userType: "user"});
  try {
    await user.save();
  } catch (err) {
    console.error(err);
  }
  res.send("user test complete");
});

app.get("/posttest", async (req, res) => {
  const post = new Post({ image: "sample image", date: "12/01/2021", likes: 2, description: "Example post", location: "Edinburgh", points: 100, achievement: "Tester"});
  try {
    await post.save();
  } catch (err) {
    console.error(err);
  }
  res.send("post test complete");
});
*/

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
