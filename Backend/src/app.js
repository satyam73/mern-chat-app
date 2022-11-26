const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const chats = require("../data");
const connectDB = require("../db/config/conn");

connectDB();
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.send("server is up on port 5000");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
