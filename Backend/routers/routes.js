const express = require("express");
const {
  registerUser,
  loginUser,
  signOutUser,
  chat,
} = require("../controllers/userControllers");
const app = express();
const auth = require("../middlewares/auth");
const router = new express.Router();

// routes
router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.get("/signout", auth, signOutUser);
router.get("/chat", auth, chat);

module.exports = router;
