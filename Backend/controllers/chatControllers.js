const mongoose = require("mongoose");
const Chat = require("../db/models/chatModel")

const getAllChats = async (req, res) => {
    const user = req.user;
    const chats = await Chat.find({ users: { $in: user._id } });
    console.log("this is the chats  ", chats);
    res.json({
        response: "All chats returned successfully!",
        chats
    })
}

const getChatByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const self = req.user;
        const limit = Number(req.query?.limit);
        let chat;

        if (!userId && !self) {
            return res.status(403).json({
                respose: "Fields cannot be empty!"
            })
        }

        if (limit) {
            chat = await Chat.find({ $and: [{ users: { $in: userId } }, { users: { $in: self._id } }] }).populate({ path: "messages", options: { sort: { createdAt: -1 }, limit } });
            return res.status(200).json({
                response: "Chat fetched successfully!",
                chat
            });
        }

        chat = await Chat.find({ $and: [{ users: { $in: userId } }, { users: { $in: self._id } }] }).populate("messages");
        return res.status(200).json({
            response: "Chat fetched successfully!",
            chat
        })
    } catch (err) {
        console.log('Something went wrong while fetching chats by user id ', err)
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}
module.exports = { getAllChats, getChatByUserId }