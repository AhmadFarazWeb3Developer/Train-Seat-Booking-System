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
const manageTrainRoute = require("./routes/manageTrain.router");
const adminRoute = require("./routes/admin.router");

app.use("/user", userRoute);
app.use("/booking", bookingTrainRoute);
app.use("/admin", manageTrainRoute);
app.use("/admin", adminRoute);

app.use("/", (req, res) => {
  res.render("index");
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
