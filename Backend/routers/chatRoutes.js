const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth")
const { getAllChats } = require("../controllers/chatControllers")

router.get("/", auth, getAllChats)


module.exports = router;