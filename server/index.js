const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { User } = require("./models/user");
require("dotenv/config");

const app = express();
console.log(process.env.DB_CONNECTION);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Connect to DB
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  (err) => {
    console.log("Connected to DB");
    if (err) console.error(err);
  }
);

// test
app.get("/hi", async (req, res) => {
  const user = new User({ password: "abc12345" });
  try {
    await user.save();
  } catch (err) {
    console.error(err);
  }

  res.send("hi");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
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
