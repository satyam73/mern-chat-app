const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    displayPic: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;