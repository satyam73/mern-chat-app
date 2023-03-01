const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", default: null },
    message: { type: String, trim: true }
}, {
    timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;