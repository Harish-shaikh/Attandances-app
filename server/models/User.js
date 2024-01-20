const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    role: { type: String, default: "user" },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
