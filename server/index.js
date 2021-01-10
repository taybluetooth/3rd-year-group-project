const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { User } = require("./models/user");
const dbConfig = require("./database/db.js");
require("dotenv/config");

const app = express();
console.log(process.env.DB_CONNECTION);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Connecting to flock cluster database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

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
