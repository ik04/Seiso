const Laundry = require("../models/Laundry");
const fs = require("fs");
const path = require("path");

const initLaundryCollection = async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "../data/laundry.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }
      try {
        const jsonData = JSON.parse(data);
        jsonData.laundry.forEach(async (laundry) => {
          await Laundry.create({
            name: laundry.name,
            schema: laundry.schema,
          });
        });
        console.log("Db Hydrated!");
        res.status(201).json({ message: "Db Hydrated!" });
      } catch (err) {
        console.error("Error parsing JSON:", err);
        res.status(500).json({ error: "Error parsing JSON" });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
  initLaundryCollection,
  getLaundries,
  getSchema,
};
