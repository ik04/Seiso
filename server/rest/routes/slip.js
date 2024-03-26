const express = require("express");
const test = require("../controllers/slipController");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");

router.post("/add", () => {});
router.post("/delete", () => {});

module.exports = router;
