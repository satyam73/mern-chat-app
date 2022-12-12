const express = require("express");
const User = require("../db/models/userModel");
const generateToken = require("../db/config/generateToken");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
  try {
    const { name, email, username, profilePic, password, confirmPassword } =
      req.body;

    if (!name || !email || !username || !password || !confirmPassword) {
      res.status(400);
      throw new Error("Please fill all the details!");
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      res.json({
        "message": "The user is already present!"
      })
    }

    const user = await User.create({
      name,
      email,
      username,
      profilePic,
      password,
      confirmPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePic: user.profilePic,
        token: await generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("There is some trouble creating user");
    }
  } catch (error) {
    console.log(error);
  }
};

const authUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      if (!email) {
        res.status(400);
        throw new Error("Unable to login!");
      }
    }
    const userByUsername = await User.findOne({ username });
    const userByEmail = await User.findOne({ email });
    const user = userByEmail || userByUsername;
    if (!user) {
      throw new Error("User not found!");
    }
    // console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePic: user.profilePic,
      });
    } else {
      throw new Error("Please Enter valid details!");
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { registerUser, authUser };
