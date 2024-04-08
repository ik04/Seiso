const Laundry = require("../models/Laundry");
const AddLaundrySchema = require("../validation/AddLaundry");

const getLaundries = async (req, res) => {
  const Laundries = await Laundry.find({});
  res.status(200).json({ Laundries: Laundries });
};

const addLaundry = async (req, res) => {
  try {
    const { name, schema } = req.body;
    const validated = AddLaundrySchema.parse({ name, schema });
    const laundry = await Laundry.create({
      name: validated.name,
      schema: validated.schema,
    });
    return res.status(201).json({ message: "Laundry Added!" });
  } catch (err) {
    // todo: handle errors
  }
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
  addLaundry,
};
