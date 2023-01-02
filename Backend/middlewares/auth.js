const jwt = require("jsonwebtoken");
const User = require("../db/models/userModel");

const auth = async (req, res, next) => {
  console.log("under auth");
  try {
    const token = req.cookies.user;
    console.log(req.cookies);
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(token, "<-------token-----------_id===========>", _id);
    const user = await User.findOne({ _id });
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error("Error: ", err.message);
    res.status(401).json({
      message: "You're not authorized!",
    });
  }
};

module.exports = auth;
