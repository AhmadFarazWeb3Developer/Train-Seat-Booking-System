const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const connectDB = require("./configurations/dbConnection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const userRoute = require("./routes/user.router");
const trainRoute = require("./routes/train.router");
router.use((req, res, next) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next();
});

app.use("/user", userRoute);
app.use("/booking", trainRoute);
connectDB()
  .then(() => {
    app.listen(3000, (req, res) => {
      console.log("Are you listening me ? ...............");
    });
  })
  .catch((err) => {
    console.log(err);
  });
