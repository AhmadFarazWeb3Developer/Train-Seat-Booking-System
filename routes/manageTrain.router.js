const express = require("express");
const addTrain = require("../controllers/train/addTrain.controller");
const trainModel = require("../models/train");
const router = express.Router();



router.get("/addTrain", (req, res) => {
  res.render("addTrain");
});

router.post("/train/add", addTrain);

router.get("/train/all", async (req, res) => {
  try {
    const trains = await trainModel.find();
    res.render("allTrains", { trains });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch trains.");
  }
});

module.exports = router;
