const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth")
const { getAllChats, getChatByUserId } = require("../controllers/chatControllers")

router.get("/", auth, getAllChats);
router.get("/:userId", auth, getChatByUserId);

module.exports = router;