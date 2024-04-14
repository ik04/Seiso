require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Laundry = require("./models/Laundry");
const User = require("./models/User");
const laundryRoutes = require("./routes/laundry");
const userRoutes = require("./routes/user");
const slipRoutes = require("./routes/slip");
const Role = require("./enums/Role");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const Slip = require("./models/Slip");
const cors = require("cors");
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ message: "Hi from Seiso! ~ Ishaan Khurana" });
});

app.use("/laundry", laundryRoutes);
app.use("/slip", slipRoutes);
app.use("/", userRoutes);

// ! dev only function, will patch out in prod
const init = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(process.env.ADMIN_PASS, salt);
  const admin = User.create({
    email: process.env.ADMIN_EMAIL,
    password: hash,
    name: process.env.ADMIN_NAME,
    role: Role.ADMIN,
  });
  try {
    const filePath = path.resolve(__dirname, "./data/laundry.json");
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

app.get("/init", init);
app.get("/nuke", async function (req, res) {
  await User.deleteMany({});
  await Laundry.deleteMany({});
  await Slip.deleteMany({});
  res.status(200).json({ message: "nuked tables" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to shitty leaf");
    app.listen(process.env.PORT, () => {
      console.log(`SERVER started on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// error handling and better validation
