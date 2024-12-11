const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn.middleware");
const registerAdmin = require("../controllers/admin/registerAdmin.controller");
const userModel = require("../models/user");
const bookingTrain = require("../controllers/booking/bookTrain.controller");
const { model } = require("mongoose");
const bookingModel = require("../models/book");

router.get("/page", (req, res) => {
  res.render("registerAdmin");
});

router.post("/create", registerAdmin);

router.get("/dashboard", async (req, res) => {
  try {
    const allUsers = await bookingModel
      .find()
      .populate("customer")
      .populate("train");
    console.log(allUsers);
    res.render("adminDashboard", { allUsers });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Error fetching bookings");
  }
});

module.exports = router;
