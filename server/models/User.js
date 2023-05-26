const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    friends: [String]
  });
  const User = mongoose.model("user", UserSchema, "user");

  module.exports = User