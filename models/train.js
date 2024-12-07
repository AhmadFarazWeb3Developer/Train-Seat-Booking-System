const mongoose = require("mongoose");

const trainSchema = mongoose.Schema({
  train_name: {
    type: String,
    required: true,
  },
  train_type: {
    type: String,
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
  },
  booked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booked",
    },
  ],
});

const trainModel = mongoose.model("train", trainSchema);

module.exports = trainModel;
