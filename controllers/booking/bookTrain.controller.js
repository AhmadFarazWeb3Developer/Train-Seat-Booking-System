const express = require("express");
const app = express();

const trainModel = require("../../models/train");
const userModel = require("../../models/user");
const bookingModel = require("../../models/book");

const bookingTrain = async (req, res) => {
  try {
    const user = await userModel.findOne({
      customer_email: req.user.customer_email,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const {
      train_name,
      seats,
      starting_station,
      ending_station,
      arrival_time,
      departure_time,
    } = req.body;

    const train = await trainModel.findOne({ train_name });
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    const booked = await bookingModel.create({
      train,
      seats,
      starting_station,
      ending_station,
      arrival_time,
      departure_time,
    });

    user.bookedTrain = booked._id;
    await user.save();

    train.total_seats -= seats;
    await train.save();
    res.redirect("/user/train");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = bookingTrain;
