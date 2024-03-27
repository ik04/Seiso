const Slip = require("../models/Slip");
const Laundry = require("../models/Laundry");
const Status = require("../enums/Status");

const test = (req, res) => {
  res.json({ user: req.user });
};

const addSlip = async (req, res) => {
  const { items, laundrySlug } = req.body;

  try {
    const laundry = await Laundry.findOne({ slug: laundrySlug });

    if (!laundry) {
      return res.status(404).json({ error: "Laundry not found" });
    }

    const schemaKeys = laundry.schema;

    const itemKeys = Object.keys(items);

    const allKeysExist = itemKeys.every((key) => schemaKeys.includes(key));

    if (!allKeysExist) {
      return res
        .status(400)
        .json({ error: "Not all keys in items are present in the schema" });
    }
    const slip = await Slip.create({
      laundry: laundry._id,
      user: req.user._id,
      items: items,
    });

    res.status(201).json({ message: "Slip created successfully", slip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSlips = async (req, res) => {
  const id = req.user._id;
  const slips = await Slip.find({ user: id });
  return res.status(200).json({ slips: slips });
};

const processSlip = async (req, res) => {
  const { uuid } = req.params;

  try {
    const slip = await Slip.findOne({ uuid });

    if (!slip) {
      return res.status(404).json({ error: "Slip not found" });
    }

    if (slip.status === Status.PROCESSED) {
      return res.status(400).json({ error: "Slip is already processed" });
    }

    const updatedSlip = await Slip.updateOne(
      { uuid },
      { $set: { status: Status.PROCESSING } }
    );

    if (updatedSlip.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Slip not found or already being processed" });
    }

    return res.status(200).json({ message: "Slip is being processed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const finishSlip = async (req, res) => {
  const { uuid } = req.params;

  try {
    const updatedSlip = await Slip.updateOne(
      { uuid },
      { $set: { status: Status.PROCESSED } }
    );

    if (updatedSlip.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Slip not found or already processed" });
    }

    return res.status(200).json({ message: "Slip processed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSlip = async (req, res) => {
  const { uuid } = req.params;
  const slip = await Slip.findOne({ uuid, user: req.user._id });

  if (!slip) {
    return res
      .status(404)
      .json({ error: "Slip not found", user: req.user._id });
  }
  const deleteSlip = await Slip.deleteOne({ uuid });
  return res.status(200).json({ message: "slip deleted!" });
};

module.exports = { addSlip, getSlips, finishSlip, processSlip, deleteSlip };
