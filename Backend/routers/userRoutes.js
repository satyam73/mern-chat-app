const express = require("express");
const {
  registerUser,
  loginUser,
  signOutUser,
  chat,
  searchUserByUsername,
  sendFriendRequest,
  acceptFriendRequest,
  getUserDetails,
  getFriends,
  getFriendRequests,
  rejectFriendRequest
} = require("../controllers/userControllers");
const auth = require("../middlewares/auth");
const router = new express.Router();

// routes
router.route("/register").post(registerUser);
router.post("/login", loginUser);
router.get("/", auth, getUserDetails)
router.get("/signout", auth, signOutUser);
router.get("/chat", auth, chat);
router.get("/search/:username", searchUserByUsername);
router.post("/:userId/friend-request/", auth, sendFriendRequest);
router.put("/:userId/friend-request/accept", auth, acceptFriendRequest);
router.get("/friends", auth, getFriends);
router.get("/friend-requests/:type", auth, getFriendRequests);
router.put("/:userId/friend-request/reject", auth, rejectFriendRequest);

module.exports = router;
