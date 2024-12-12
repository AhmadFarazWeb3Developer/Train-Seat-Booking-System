const trainModel = require("../../models/train");
const userModel = require("../../models/user");
const bookingModel = require("../../models/book");
const bookingTrain = async (req, res) => {
  try {
    const user = await userModel.findOne({
      customer_email: req.user.customer_email,
    });

    if (!user) {
      const error = "User not found";
      return res.render("error", { error });
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

    if (train.total_seats < seats) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    const bookingCount = await bookingModel.countDocuments();
    const ticket_number = `${bookingCount + 1}-2024-PK`;

    const booked = await bookingModel.create({
      customer: user._id,
      train: train._id,
      ticket_number,
      seats,
      starting_station,
      ending_station,
      arrival_time,
      departure_time,
    });

    user.bookedTrain.push(booked._id);
    await user.save();

    train.total_seats -= seats;
    await train.save();

    res.redirect("/user/train");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = bookingTrain;
