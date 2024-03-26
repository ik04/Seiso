const Slip = require("../models/Slip");
const Laundry = require("../models/Laundry");

const test = (req, res) => {
  res.json({ user: req.user });
};

const addSlip = async (req, res) => {
  const { items, laundrySlug } = req.body;
  Laundry.findOne({ slug: laundrySlug }).select("schema", "_id");
  
};

module.exports = test;
