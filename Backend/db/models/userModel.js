const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    tokens: [{ token: { type: String } }],
  },
  { timestamps: true }
);

// middleware for hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = await bcrypt.hash(this.password, 10);
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
