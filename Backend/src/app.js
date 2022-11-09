console.log("hello world");
const express = require("express");
const app = express();
const PORT = 5000;
app.get("/", (req, res) => {
    res.send("server is up on port 5000")
})

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
})