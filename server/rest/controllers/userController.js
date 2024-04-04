require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("at", token, {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logged in!", token });
  } catch (err) {
    console.log(err);
  }
};

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.signup(email, password, name);
    const token = createToken(user._id);
    res.status(201).json({ message: "user created", token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
const getUserData = async (req, res) => {
  try {
    const token = req.cookies.at;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken._id;
    const user = await User.find({ _id: userId });
    res.status(200).json({ user: user, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logout = (req, res) => {
  res.clearCookie("at");

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { login, signup, logout, getUserData };
