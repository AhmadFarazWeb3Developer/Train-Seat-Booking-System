const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  customer_name: {
    type: String,
  },

  customer_email: {
    type: String,
  },

  customer_phone: {
    type: String,
  },
  bookedTrain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
