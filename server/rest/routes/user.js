const express = require("express");
const {
  signup,
  login,
  logout,
  getUserData,
} = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", requireAuth, logout);
router.get("/user-data", getUserData);

module.exports = router;
