const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const { sendMessage } = require("../controllers/messageController")
router.post("/", auth, sendMessage);
module.exports = router;