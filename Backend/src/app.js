const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const chats = require("../data");
const connectDB = require("../db/config/conn");
const userRoutes = require("../routers/routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use("/api/user", userRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("Api is running successfully");
});
// app.use(router);
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
