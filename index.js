const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./configurations/dbConnection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

const userRoute = require("./routes/user.router");
const bookingTrainRoute = require("./routes/bookingTrain.router");
const manageTrain = require("./routes/manageTrain.router");

router.use((req, res, next) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next();
});

app.use("/user", userRoute);
app.use("/booking", bookingTrainRoute);
app.use("/admin", manageTrain);
connectDB()
  .then(() => {
    app.listen(3000, (req, res) => {
      console.log("Are you listening me ? ...............");
    });
  })
  .catch((err) => {
    console.log(err);
  });
