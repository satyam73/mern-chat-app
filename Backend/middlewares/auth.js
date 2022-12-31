const jwt = require("jsonwebtoken");
const User = require("../db/userModel");

const auth = async (req, res, next) => {
  console.log("under auth");
  try {
    const cookie = req.cookies;
    console.log(cookie);
  } catch (err) {
    console.error(err);
  }
};

module.exports = auth;
