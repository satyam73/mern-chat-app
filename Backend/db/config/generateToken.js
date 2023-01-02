const jwt = require("jsonwebtoken");

const generateToken = async (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  //   console.log(token);
  return token;
};

module.exports = generateToken;
