const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "45fb233ff3e67673b773fb994c40aab3abe8244a76fe5c3c3b7b0e05db37efe0";

function generateToken(_id) {
  try {
    return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1d" });
  } catch (err) {
    console.error(err);
    return null;
  }
}

function getIDFromToken(token) {
  try {
    const { _id } = jwt.verify(token, JWT_SECRET);
    return _id;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { generateToken, getIDFromToken };
