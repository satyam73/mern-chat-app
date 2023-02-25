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
        expire: Date.now() + 2592000000,
        httpOnly: true,
      });
      // console.log("ln 79 ", req.cookie);
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
const getUserDetails = async (req, res) => {
  // let user = req.user;
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    profilePic: req.user.profilePic,
    requests: req.user.requests,
    friends: req.user.friends
  }
  console.log("user ln 99 ", user)
  return res.status(200).json({
    response: "User details returned successfully!",
    user
  })
}
const signOutUser = async (req, res) => {
  try {
    // console.log("req.user ", req.user);
    // console.log("req.token ", req.token);
    res.clearCookie("user");
    res.status(200).json({
      message: "Signout Successfully",
    });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(400).json({
      message: "The request is not processed!",
    });
  }
};

const searchUserByUsername = async (req, res) => {
  try {
    console.log("searchUserByUsername");
    const username = req.params.username;
    console.log(username)
    if (!username) {
      return res.json({
        response: "Please enter valid username!"
      });
    }
    const user = await User.find({ username: { $regex: username } });
    const users = [];
    user.forEach((elem) => {
      users.push({ username: elem.username, id: elem._id })
    })

    return res.json({
      users
    })
  } catch (err) {
    console.log("Error : ", err)
  }
};

const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const fromUser = req.user._id.toString();

    if (!userId) {
      return res.json({
        response: "User not found!"
      });
    }

    if (fromUser === userId) {
      console.log('same id')
      return res.json({
        response: "Cannot send friend request to yourself!"
      })
    }

    const toUser = await User.findById({ _id: userId });

    if (toUser.requests.includes(fromUser)) {
      return res.json({
        response: "You've already sent friend request to the user!"
      })
    }

    toUser.requests.push(fromUser);
    await toUser.save();

    return res.json({
      response: "Friend request sent successfully!"
    })
  } catch (err) {
    console.log("Error : ", err)
  }
}

const acceptFriendRequest = async (req, res) => {
  console.log("accept request");
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.json({
        response: "User not found!"
      });
    }

    const user = await User.findById({ _id: req.user._id });

    if (user.requests.includes(userId)) {
      console.log('request is there!')
      user.requests = user.requests.filter((request) => {
        return request !== userId;
      });
      user.friends.push(userId);
      await user.save();
      return res.json({
        response: "Friend is added!"
      })
    } else {
      return res.json({
        response: "Something went wrong"
      })
    }
  } catch (err) {
    console.log("Error : ", err)
  }
}
const chat = async (req, res) => {
  res.status(200).json({
    message: "Welcome to chat page!",
  });
};
module.exports = { registerUser, loginUser, getUserDetails, chat, searchUserByUsername, signOutUser, sendFriendRequest, acceptFriendRequest };
