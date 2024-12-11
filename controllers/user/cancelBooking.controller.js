const bookingModel = require("../../models/book");
const trainModel = require("../../models/train");
const userModel = require("../../models/user");

const cancelBooking = async (req, res) => {
  try {
    const user = await userModel.findOne({
      customer_email: req.user.customer_email,
    });
    if (!user || !user.bookedTrain) {
      return res.status(404).send("No User or Booking Found");
    }

    const bookedTrain = await bookingModel.findOne({
      _id: user.bookedTrain._id,
    });
    if (!bookedTrain) {
      return res.status(404).send("Booking record not found");
    }

    const adminTrain = await trainModel.findOne({ _id: bookedTrain.train._id });
    if (!adminTrain) {
      return res.status(404).send("Train record not found");
    }

    adminTrain.total_seats += bookedTrain.seats;
    await adminTrain.save();

    await bookingModel.deleteOne({ _id: bookedTrain._id });
    user.bookedTrain = null;
    await user.save();

    res.redirect("/user/train");
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).send("An error occurred while cancelling the booking");
  }
};

module.exports = cancelBooking;
