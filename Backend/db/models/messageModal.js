const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    message: { type: String, trim: true }
}, {
    timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);