const express = require("express");
const connectDB = require("./configurations/dbConnection");
const userModel = require("./models/user");
const bookingModel = require("./models/book");
const trainModel = require("./models/train");
const { trace } = require("console");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/create", async (req, res) => {
  const user = await userModel.create({
    customer_name: "Ahmad Faraz",
    customer_email: "ahmad@gmail.com",
    customer_phone: "03169962046",
  });
  res.status(201).json({ user });
});

app.post("/add/train", async (req, res) => {
  const train = await trainModel.create({
    train_name: "Waris Shah",
    train_type: "Express",
    availiableSeats: 1500,
  });
  res.send(train);
});

app.post("/book", async (req, res) => {
  try {
    const user = await userModel.findOne({ customer_email: "ahmad@gmail.com" });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const booked = await bookingModel.create({
      customer: user._id,
      train: "675409fa2875d5f4ac3cc0f7",
      seats: 4,
      starting_station: "Rawalpindi",
      ending_station: "Peshawer",
      arrival_time: "14:40 PM",
      departure_time: "11:30 PM",
    });

    user.bookedTrain = "675409fa2875d5f4ac3cc0f7";
    user.save();
    const train = await trainModel.findOne({ _id: "675409fa2875d5f4ac3cc0f7" });

    train.booked.push(booked);
    await train.save();

    res.status(201).json({ booked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

connectDB()
  .then(() => {
    app.listen(3000, (req, res) => {
      console.log("Are you listening me ? ...............");
    });
  })
  .catch((err) => {
    console.log(err);
  });
