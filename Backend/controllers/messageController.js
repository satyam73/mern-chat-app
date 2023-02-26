const Message = require("../db/models/messageModal");


const sendMessage = async (req, res) => {
    const { sender, chat, message } = req.body;
    if (!sender || !chat || !message) {
        return res.status(400).json({
            response: "Field cannot be empty!"
        })
    }
    const savedMessage = new Message({
        sender,
        chat,
        message
    });
    await savedMessage.save();

    res.status(201).json({
        response: "ok"
    })
}

module.exports = { sendMessage }