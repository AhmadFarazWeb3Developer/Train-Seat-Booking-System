const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/user/user.controller");
const userBookedTrain = require("../controllers/user/userTrain.controller");
const isLoggedIn = require("../middleware/isLoggedIn.middleware");
const cancelBooking = require("../controllers/user/cancelBooking.controller");

router.get("/", (req, res, next) => {
  res.render("registerUser");
});

router.post("/create", registerUser);

router.get("/train", isLoggedIn, userBookedTrain);
router.post("/booking/cancle", isLoggedIn, cancelBooking);

module.exports = router;
