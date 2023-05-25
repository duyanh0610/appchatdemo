const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: {type:mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    name: String,
    email: String,
    username: String,
    password: String,
    friends: [String]
  });
  const User = mongoose.model("user", UserSchema, "user");

  module.exports = User