const Laundry = require("../models/Laundry");

const getLaundries = async (req, res) => {
  const Laundries = await Laundry.find({});
  res.status(200).json({ Laundries: Laundries });
};

const getSchema = async (req, res) => {
  try {
    const { slug } = req.params;
    const schema = await Laundry.findOne({ slug: slug }).select("schema");
    if (!schema) {
      return res.status(404).json({ error: "Schema not found" });
    }
    res.status(200).json({ schema: schema.schema });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getLaundries,
  getSchema,
};
