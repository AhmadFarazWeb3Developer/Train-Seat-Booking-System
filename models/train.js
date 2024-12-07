const mongoose = require("mongoose");
const trainSchema = mongoose.Schema({
  train_name: {
    type: String,
  },
  train_type: {
    type: String,
  },
  availiableSeats: {
    type: Number,
    default: 1000,
  },
  booked: [
    {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
  ],
});

const trainModel = mongoose.model("train", trainSchema);
module.exports = trainModel;
