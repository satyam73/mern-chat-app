const express = require("express");
const User = require("../db/models/userModel");
const generateToken = require("../db/config/generateToken");
const bcrypt = require("bcryptjs");
const Chat = require("../db/models/chatModel");
const domainUrl = process.env.DOMAIN;

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
      return res.status(400).json({
        message: "Please add valid credentials!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200);
      user.tokens = user.tokens.concat({ token });
      res.cookie("user", token, {
        domain: domainUrl,
        expire: Date.now() + 2592000000,
        sameSite: "lax",
        secure: true,
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

  return res.status(200).json({
    response: "User details returned successfully!",
    user
  })
}
const signOutUser = async (req, res) => {
  try {
    const cookie = req.cookies.user.trim();
    const user = req.user;
    console.log('clearing cookie', req.cookies.user.trim())
    console.log(cookie);
    console.log({ tokenLengthBefore: user.tokens.length })
    res.clearCookie("user", {
      domain: domainUrl,
      expire: Date.now() + 2592000000,
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    });

    user.tokens = user.tokens.filter((token) => token !== cookie);
    await user.save();
    console.log('cookie cleared', req.cookies.user.trim())
    console.log({ tokenLengthAfter: user.tokens.length })
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
    const username = req.params.username;
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
    // fromUser is self account and toUser is whom the self is sending the request
    const { userId } = req.params;
    const fromUser = req.user;

    if (!userId) {
      return res.json({
        response: "User not found!"
      });
    }

    if (fromUser._id.toString() === userId) {
      return res.status(400).json({
        response: "Cannot send friend request to yourself!"
      })
    }

    const toUser = await User.findById({ _id: userId });

    if (toUser.pendingRequests.includes(fromUser)) {
      return res.status(409).json({
        response: "You've already sent friend request to the user!"
      })
    }

    toUser.incomingRequests.push(fromUser._id);
    fromUser.pendingRequests.push(toUser);
    await toUser.save();
    await fromUser.save();
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
    //user is whose friend request is came and the self is accepting the friend request here
    const user = await User.findById({ _id: userId });
    const self = req.user;
    if (!userId) {
      return res.status(404).json({
        response: "User not found!"
      });
    }

    if (self.incomingRequests.includes(userId)) {
      self.incomingRequests = self.incomingRequests.filter((request) => {
        return request.toString() !== userId;
      });
      user.pendingRequests = user.pendingRequests.filter((request) => {
        return request.toString() !== self._id.toString();
      })
      self.friends.push(userId);
      user.friends.push(self._id);

      // 
      const chat = new Chat();
      chat.users.push(...[self._id, user._id])
      self.chats.push(chat._id);
      user.chats.push(chat._id);
      // await receiver.save();
      // await sender.save();
      // const savedMessage = new Message({
      //   sender: senderId,
      //   receiver: receiverId,
      //   chat: chat._id,
      //   message
      // });
      // await savedMessage.save();
      // chat.messages.push(savedMessage);
      await chat.save()
      // 
      await self.save();
      await user.save();

      return res.status(200).json({
        response: "Friend is added!"
      });
    } else {
      return res.status(500).json({
        response: "Something went wrong"
      })
    }
  } catch (err) {
    console.log("Error : ", err)
  }
}

const getFriends = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.json({
        response: "User not found!"
      })
    }

    const { friends } = await user.populate("friends", { password: 0, confirmPassword: 0, tokens: 0 });
    res.status(200).json({
      response: "All friend returned successfully!",
      friends
    })
  } catch (err) {
    return res.json({
      response: "Something went wrong!"
    })
  }
}

const getFriendRequests = async (req, res) => {
  try {
    const user = req.user;
    //type - incoming || pending
    const { type } = req.params;

    if (type.trim() === "incoming") {
      const populatedUserRequest = await user.populate("incomingRequests", {
        password: 0, confirmPassword: 0, chats: 0, tokens: 0, friends: 0,
        incomingRequests: 0,
        pendingRequests: 0
      });
      const incomingRequests = populatedUserRequest.incomingRequests;
      return res.status(200).json({
        response: "All incoming friend requests fetched successfully!",
        incomingRequests
      })
    }

    if (type.trim() === "pending") {
      const populatedUserRequest = await user.populate("pendingRequests", {
        password: 0, confirmPassword: 0, chats: 0, tokens: 0, friends: 0,
        incomingRequests: 0,
        pendingRequests: 0
      });
      const pendingRequests = populatedUserRequest.pendingRequests;
      return res.status(200).json({
        response: "All pending friend requests fetched successfully!",
        pendingRequests
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      response: "Something went wrong!"
    })
  }
}

const rejectFriendRequest = async (req, res) => {
  const { userId } = req.params;
  const self = req.user;

  if (!userId) {
    return res.status(404).json({
      response: "User not found!"
    });
  }

  if (!self.incomingRequests.includes(userId)) {
    res.status(400).json({
      response: "There is not incoming request with this userId!"
    });
  }

  self.incomingRequests = self.incomingRequests.filter((request) => {
    return request.toString() !== userId;
  });

  try {
    const user = await User.findById({ _id: userId });

    if (!user.pendingRequests.includes(self._id)) {
      res.status(400).json({
        response: "Bad request"
      });
    }

    user.pendingRequests = user.pendingRequests.filter((request) => {
      return request.toString() !== self._id.toString();
    });

    await self.save();
    await user.save();

    return res.status(200).json({
      response: 'Friend request rejected successfully'
    });
  } catch (error) {
    return res.status(500).json({
      response: 'Internal server error',
      error: error.message
    });
  }
}
const chat = async (req, res) => {
  res.status(200).json({
    message: "Welcome to chat page!",
  });
};
module.exports = { registerUser, loginUser, getUserDetails, chat, searchUserByUsername, signOutUser, sendFriendRequest, acceptFriendRequest, getFriends, getFriendRequests, rejectFriendRequest };
