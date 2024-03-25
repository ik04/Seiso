require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Laundry = require("./models/Laundry");
const laundryRoutes = require("./routes/laundry");

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ message: "Hi from Seiso! ~ Ishaan Khurana" });
});

app.use("/laundry", laundryRoutes);

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
