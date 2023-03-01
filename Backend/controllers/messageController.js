const Message = require("../db/models/messageModal");
const Chat = require("../db/models/chatModel")
const User = require("../db/models/userModel")

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, chatId, message } = req.body;
        if (!senderId || !message) {
            return res.status(400).json({
                response: "Field cannot be empty!"
            })
        }
        const sender = await User.findOne({ _id: senderId });
        const receiver = await User.findOne({ _id: receiverId });
        console.log("ln 13 ", sender)
        if (sender.chats.includes(chatId)) {
            const chat = await Chat.findOne({ _id: chatId });
            const savedMessage = new Message({
                sender: senderId,
                receiver: receiverId,
                chat: chat._id,
                message
            });
            await savedMessage.save();
            chat.messages.push(savedMessage);
            await chat.save();
            return res.json({
                response: "Chat was already present!"
            })
        }

        if (!chatId) {
            const chat = new Chat();
            const savedMessage = new Message({
                sender: senderId,
                receiver: receiverId,
                chat: chat._id,
                message
            });
            chat.users.push(...[senderId, req.user._id])
            sender.chats.push(chat._id);
            receiver.chats.push(chat._id);
            await receiver.save();
            await sender.save();
            await savedMessage.save();
            chat.messages.push(savedMessage);
            await chat.save()
            res.status(201).json({
                response: "New Chat Started!"
            })
        }
    } catch (err) {
        console.log("Error: ", err)
    }

}

module.exports = { sendMessage }