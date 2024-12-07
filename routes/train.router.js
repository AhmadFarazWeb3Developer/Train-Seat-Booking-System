const express = require("express");
const bookingTrain = require("../controllers/bookTrain.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("bookTrain");
});

router.post("/train", bookingTrain);

module.exports = router;
