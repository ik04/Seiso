const mongoose = require("mongoose");
const uuid = require("uuid");
const Status = require("../enums/Status");

const slipSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuid.v4,
    unique: true,
    required: true,
  },
  laundry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Laundry",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  status: {
    type: Number,
    default: Status.UNPROCESSED,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  finished_date: {
    type: Date,
  },
});

const Slip = mongoose.model("Slip", slipSchema);

module.exports = Slip;
