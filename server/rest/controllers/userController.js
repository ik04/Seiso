require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const UserSignupSchema = require("../validation/SignupUser");
const UserLoginSchema = require("../validation/LoginUser");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};
const { ZodError } = require("zod");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const validatedUserData = UserSignupSchema.parse({ name, email, password });

    const user = await User.signup(
      validatedUserData.email,
      validatedUserData.password,
      validatedUserData.name
    );
    const token = createToken(user._id);
    res.cookie("at", token, {
      httpOnly: true,
    });
    res.status(201).json({ message: "user created", token });
  } catch (err) {
    if (err.errors) {
      const mappedErrors = err.errors.map((error) => ({
        message: error.message,
        path: error.path.join("."),
      }));
      res.status(400).json({ errors: mappedErrors });
    } else {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validatedUserData = UserLoginSchema.parse({ email, password });
    const user = await User.login(
      validatedUserData.email,
      validatedUserData.password
    );
    const token = createToken(user._id);
    res.cookie("at", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      domain: "localhost",
    });
    res.status(200).json({ message: "Logged in!", token });
  } catch (err) {
    if (err.errors) {
      const mappedErrors = err.errors.map((error) => ({
        message: error.message,
        path: error.path.join("."),
      }));
      res.status(400).json({ errors: mappedErrors });
    } else {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
};

const getUserData = async (req, res) => {
  try {
    const token = req.cookies.at;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("at");

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { login, signup, logout, getUserData };
