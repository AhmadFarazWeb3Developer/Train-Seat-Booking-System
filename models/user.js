const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  customer_name: {
    type: String,
  },

  customer_email: {
    type: String,
  },
  customer_password: {
    type: String,
  },

  customer_phone: {
    type: String,
  },
  bookedTrain: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booked",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
