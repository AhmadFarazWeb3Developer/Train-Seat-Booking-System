const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/user/user.controller");

router.get("/", (req, res) => {
  res.render("registerUser");
});

router.post("/create", registerUser);

module.exports = router;
