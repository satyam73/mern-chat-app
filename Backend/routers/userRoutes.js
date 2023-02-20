const express = require("express");
const {
  registerUser,
  loginUser,
  signOutUser,
  chat,
  searchUserByUsername,
  sendFriendRequest,
  acceptFriendRequest
} = require("../controllers/userControllers");
const app = express();
const auth = require("../middlewares/auth");
const router = new express.Router();

// routes
router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.get("/signout", auth, signOutUser);
router.get("/chat", auth, chat);
router.get("/search/:username", searchUserByUsername);
router.post("/:userId/friend-request/", auth, sendFriendRequest);
router.put("/:userId/friend-request/accept", auth, acceptFriendRequest);

module.exports = router;
