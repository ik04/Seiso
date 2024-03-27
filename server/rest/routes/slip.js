const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
  addSlip,
  getSlips,
  finishSlip,
  processSlip,
  deleteSlip,
} = require("../controllers/slipController");

router.post("/add", requireAuth, addSlip);
router.get("/fetch", requireAuth, getSlips);
router.put("/process/:uuid", requireAuth, processSlip);
router.put("/finish/:uuid", requireAuth, finishSlip);
router.delete("/delete/:uuid", requireAuth, deleteSlip);

module.exports = router;
