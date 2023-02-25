const mongoose = require("mongoose");

// const chatSchema = mongoose.Schema({
//     isGroupChat: { type: Boolean, default: false },
//     users: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     }],
//     newMessage: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Message"
//     },
//     groupAdmin: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     }
// }, {
//     timestamps: true,
// });

const chatSchema = mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true
    }]
}, {
    timestamps: true
})

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;