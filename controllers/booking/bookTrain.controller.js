const trainModel = require("../../models/train");
const userModel = require("../../models/user");
const bookingModel = require("../../models/book");
const bookingTrain = async (req, res) => {
  try {
    // Find the user based on the email (use req.user to access user info if using authentication)
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

    // Find the train by name
    const train = await trainModel.findOne({ train_name });
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    // Ensure there are enough available seats
    if (train.total_seats < seats) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    // Create the booking and associate the user with the booking
    const booked = await bookingModel.create({
      customer: user._id, // Pass the user's _id here instead of the whole user object
      train: train._id,
      seats,
      starting_station,
      ending_station,
      arrival_time,
      departure_time,
    });
    console.log(booked);

    // Add the booking to the user's bookedTrain array
    user.bookedTrain.push(booked._id);
    await user.save();

    // Update the train's available seats
    train.total_seats -= seats;
    await train.save();

    // Redirect or respond with success
    res.redirect("/user/train");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = bookingTrain;
