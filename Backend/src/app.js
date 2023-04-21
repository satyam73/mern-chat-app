const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const http = require("http");
const PORT = 5000;
const cors = require("cors");
const connectDB = require("../db/config/conn");
const userRoutes = require("../routers/userRoutes");
const chatRoutes = require("../routers/chatRoutes");
const messageRoutes = require("../routers/messageRoutes");
const cookieParser = require("cookie-parser");
const io = require("socket.io")(8080)
const server = http.createServer(app)
// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// database connection 
connectDB();

io.on("connection", socket => {
  let chatId;
  socket.on("joining", id => {
    chatId = id;
    socket.join(id);
    socket.emit("joined")
    console.log("joined ", id)
  })

  socket.on("send-message", (message) => {
    socket.in(message.chat).emit("receive-message", message);
    console.log("ln 37 ", message)
  });
  socket.on("disconnect", (reason) => {
    console.log("The connection is closed: ", reason);
  });
})

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

server.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
