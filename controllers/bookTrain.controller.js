const express = require("express");
const app = express();

const trainModel = require("../models/train");
const userModel = require("../models/user");

const bookingTrain = async (req, res) => {
  try {
    const user = await userModel.findOne({ customer_email: "nadar@gmail.com" });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const booked = await bookingModel.create({
      customer: user._id,
      train: "675409fa2875d5f4ac3cc0f7",
      seats: 4,
      starting_station: "Rawalpindi",
      ending_station: "Peshawer",
      arrival_time: "14:40 PM",
      departure_time: "11:30 PM",
    });

    user.bookedTrain = "675409fa2875d5f4ac3cc0f7";
    user.save();
    const train = await trainModel.findOne({ _id: "675409fa2875d5f4ac3cc0f7" });

    train.booked.push(booked);
    await train.save();

    res.status(201).json({ booked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// app.post("/add/train", async (req, res) => {
//   const train = await trainModel.create({
//     train_name: "Waris Shah",
//     train_type: "Express",
//     availiableSeats: 1500,
//   });
//   res.send(train);
// });

module.exports = bookingTrain;
