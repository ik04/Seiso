const express = require("express");
const router = express.Router();

const { getLaundries, getSchema } = require("../controllers/laundryController");
const requireAuth = require("../middlewares/requireAuth");

router.get("/all", requireAuth, getLaundries);
router.get("/schema/:slug", requireAuth, getSchema);

module.exports = router;
