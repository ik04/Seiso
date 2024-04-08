const express = require("express");
const router = express.Router();

const {
  getLaundries,
  getSchema,
  addLaundry,
} = require("../controllers/laundryController");
const requireAuth = require("../middlewares/requireAuth");
const requireAdminAuth = require("../middlewares/requireAdminAuth");

router.get("/all", requireAuth, getLaundries);
router.get("/schema/:slug", requireAuth, getSchema);
router.post("/add", requireAdminAuth, addLaundry);

module.exports = router;
