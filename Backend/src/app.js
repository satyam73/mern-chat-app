console.log("hello world");
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const chats = require("../data");

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
