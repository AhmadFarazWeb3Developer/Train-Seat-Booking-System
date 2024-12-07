const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/Train_Booking_System");

  console.log("Database connected !");
};

module.exports = connectDB;
