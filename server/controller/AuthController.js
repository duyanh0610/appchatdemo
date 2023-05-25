const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const auth = require("../routes/AuthRoutes");
const User = require("../models/User");
const hash = require("./PasswordHash");

const newToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      return res
        .status(400)
        .json({ message: "All fields can not be null or blank" });
    }
    const user = await User.findOne({
      $or: [{ username: username }, { email: password }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!hash.comparePass(password, user.password)) {
      return res
        .status(400)
        .json({ message: "Check username or password again" });
    }

    const token = newToken(user._id);

    return res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: token,
    });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json(err);
  }
};
const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return res.status(404).json({ message: "Existed!" });
    }
    if (!name || !email || !password || !username) {
      return res
        .status(400)
        .json({ message: "All fields can not be null or blank" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minSymbols: 0,
        minUppercase: 0,
      })
    ) {
      return res.status(400).json({ message: "password is not strong" });
    }
    let newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.name = name;
    newUser.password = await hash.encryptPass(password);
    newUser.friends = [];
    console.log(newUser);
    const rs = await newUser.save();
    const token = newToken(newUser._id);

    return res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      token: token,
    });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json(err);
  }
};

module.exports = { signin, signup };
