const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const slugify = require("slugify");

const laundrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  schema: {
    type: Array,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

laundrySchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next();
  }
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Laundry = mongoose.model("Laundry", laundrySchema);

module.exports = Laundry;
