const express = require("express");
const bookingTrain = require("../controllers/booking/bookTrain.controller");
const trainModel = require("../models/train");

const router = express.Router();

router.get("/", async (req, res) => {
  const trains = await trainModel.find();
  console.log("trains", trains);
  res.render("bookTrain", { trains });
});

router.post("/train", bookingTrain);

module.exports = router;
