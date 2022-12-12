const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const chats = require("../data");
const connectDB = require("../db/config/conn");
const userRoutes = require("../routers/routes");
app.use(express.json());

connectDB();
app.use(cors({ origin: true, credentials: true }));
app.get("/", (req, res) => {
  res.send("Api is running successfully");
});
app.use("/api/user", userRoutes);
// app.use(router);
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
