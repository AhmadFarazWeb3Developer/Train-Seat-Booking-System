const express = require("express");
const bookingTrain = require("../controllers/booking/bookTrain.controller");
const trainModel = require("../models/train");
const isLoggedIn = require("../middleware/isLoggedIn.middleware");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res) => {
  const trains = await trainModel.find();

  res.render("bookTrain", { trains });
});

router.post("/train", isLoggedIn, bookingTrain);

module.exports = router;
