const Slip = require("../models/Slip");
const Laundry = require("../models/Laundry");
const Status = require("../enums/Status");
const AddSlipSchema = require("../validation/AddSlip");

const addSlip = async (req, res) => {
  const { items, laundrySlug, date } = req.body;

  try {
    // todo: add zod validation
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
    const allValuesNumbers = itemKeys.every(
      (key) => typeof items[key] === "number"
    );

    if (!allValuesNumbers) {
      return res
        .status(400)
        .json({ error: "Slip item values should be numbers" });
    }
    if (date != undefined) {
      const slip = await Slip.create({
        laundry: laundry._id,
        user: req.user._id,
        items: items,
        date: date,
      });
      res.status(201).json({ message: "Slip created successfully", slip });
    } else {
      const slip = await Slip.create({
        laundry: laundry._id,
        user: req.user._id,
        items: items,
      });
      res.status(201).json({ message: "Slip created successfully", slip });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSlips = async (req, res) => {
  const id = req.user._id;
  const slips = await Slip.find({ user: id, status: { $ne: Status.PROCESSED } })
    .populate({
      path: "laundry",
      select: { name: 1, slug: 1, _id: 0 },
    })
    .select({ items: 1, status: 1, uuid: 1, _id: 0, date: 1 })
    .sort([
      ["date", "desc"],
      ["status", "asc"],
    ]);
  const slipsWithTotalItems = slips.map((slip) => {
    const totalItems = Object.values(slip.items).reduce(
      (acc, val) => acc + val,
      0
    );
    return { ...slip.toObject(), total_items: totalItems };
  });

  return res.status(200).json({ slips: slipsWithTotalItems });
};

const getFinishedSlips = async (req, res) => {
  const id = req.user._id;
  const slips = await Slip.find({ user: id, status: Status.PROCESSED })
    .populate({
      path: "laundry",
      select: { name: 1, slug: 1, _id: 0 },
    })
    .select({ items: 1, status: 1, uuid: 1, _id: 0, date: 1 })
    .sort([["date", "desc"]]);
  const slipsWithTotalItems = slips.map((slip) => {
    const totalItems = Object.values(slip.items).reduce(
      (acc, val) => acc + val,
      0
    );
    return { ...slip.toObject(), total_items: totalItems };
  });
  return res.status(200).json({ slips: slipsWithTotalItems });
};

const processSlip = async (req, res) => {
  const { uuid } = req.params;

  try {
    const slip = await Slip.findOne({ uuid });

    if (!slip) {
      return res.status(404).json({ error: "Slip not found" });
    }
    if (slip.status === Status.PROCESSING) {
      return res.status(409).json({ error: "Slip is already being processed" });
    }
    if (slip.status === Status.PROCESSED) {
      return res.status(409).json({ error: "Slip is already processed" });
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

    return res
      .status(200)
      .json({ message: "Slip is now under processing", slip: slip });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const finishSlip = async (req, res) => {
  const { uuid } = req.params;

  try {
    const slip = await Slip.findOne({ uuid });
    if (slip.status === Status.PROCESSED) {
      return res.status(409).json({ error: "Slip is already processed" });
    }
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

module.exports = {
  addSlip,
  getSlips,
  finishSlip,
  processSlip,
  deleteSlip,
  getFinishedSlips,
};
