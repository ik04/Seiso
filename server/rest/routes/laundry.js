const express = require("express");
const router = express.Router();

const {
  initLaundryCollection,
  getLaundries,
  getSchema,
} = require("../controllers/laundryController");

router.get("/init", initLaundryCollection);
router.get("/all", getLaundries);
router.get("/schema/:slug", getSchema);

module.exports = router;
