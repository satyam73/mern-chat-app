const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log(`connected to database : `, connection.connection.host);
  } catch (err) {
    console.log("Uhh oh :( you got come error : ", err);
  }
};

module.exports = connectDB;
