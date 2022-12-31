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
      return res.json({
        message: "The user is already present!",
      });
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

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      if (!email) {
        res.status(400);
        console.log("Unable to login!");
      }
    }

    const userByEmail = await User.findOne({ email });
    const userByUsername = await User.findOne({ username });
    const user = userByEmail || userByUsername;
    const token = await generateToken(user._id);

    if (!user) {
      console.log("User not found!");
      return res.status(400).json({
        message: "Please add valid credentials!",
      });
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200);
      user.tokens = user.tokens.concat({ token });
      res.cookie("user", token, {
        // httpOnly: true,
      });
      console.log("ln 79 ", req.cookie);
      await user.save();
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePic: user.profilePic,
        tokens: [...user.tokens],
      });
    } else {
      throw new Error("Please Enter valid details!");
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { registerUser, loginUser };
