const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAdminAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Auth Token is required!" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.find({ _id });
    const role = user.role;
    if (role != 0) {
      throw new Error("You are not an admin");
    }
    req.user._id = user._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = requireAdminAuth;
