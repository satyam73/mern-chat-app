const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");
const app = express();
const router = new express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);

module.exports = router;
