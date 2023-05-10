const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require("path")
const http = require("http");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("../db/config/conn");
const userRoutes = require("../routers/userRoutes");
const chatRoutes = require("../routers/chatRoutes");
const messageRoutes = require("../routers/messageRoutes");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const server = http.createServer(app)
const frontendUrl = process.env.FRONTEND_URL;
const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    credentials: true
  }
});

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// database connection 
connectDB();

//socket.io event handlings
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
  socket.on("connect_error", (err) => {
    console.log("ln44 ", err.message)
  })
})
//socket.io event handlings



// configuration setup for production
const dirName = path.resolve(__dirname);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(dirName, "../../frontend/build")));
  app.get("*", (req,res)=> res.sendFile(path.join(dirName, "../../frontend/build/index.html")))
  console.log(path.join(dirName, "../../frontend/build/index.html"))
}else{
  app.get("/", (req, res) => {
    res.status(200).send({ response: "Api is running successfully!" });
  });
}
// configuration setup for production

server.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
