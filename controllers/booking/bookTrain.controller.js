const express = require("express");
const app = express();

const trainModel = require("../../models/train");
const userModel = require("../../models/user");
const bookingModel = require("../../models/book");
const bookingTrain = async (req, res) => {
  try {
    const customer = await userModel.findOne({
      customer_email: "nadar@gmail.com",
    });
    if (!customer) {
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

    const booked = await bookingModel.create({
      customer,
      train,
      seats,
      starting_station,
      ending_station,
      arrival_time,
      departure_time,
    });

    customer.bookedTrain = train._id;
    customer.save();

    const bookedTrain = await trainModel.findOne({ _id: train._id });

    train.booked.push(bookedTrain);
    await train.save();
    train.total_seats -= seats;
    await train.save();

    res.status(201).json({ booked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = bookingTrain;
