const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "train",
  },
  seats: {
    type: Number,
  },
  starting_station: {
    type: String,
  },
  ending_station: {
    type: String,
  },
  arrival_time: {
    type: String,
  },
  departure_time: {
    type: String,
  },
});

const bookingModel = mongoose.model("booked", bookingSchema);

module.exports = bookingModel;
