const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("../db/config/conn");
const userRoutes = require("../routers/userRoutes");
const chatRoutes = require("../routers/chatRoutes");
const messageRoutes = require("../routers/messageRoutes");

const cookieParser = require("cookie-parser");

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

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});

app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
