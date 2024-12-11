const userModel = require("../../models/user");

const userBookedTrain = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ customer_email: "nadar@gmail.com" })
      .populate({
        path: "bookedTrain",
        populate: {
          path: "train",
        },
      });

    if (!user || !user.bookedTrain) {
      return res.render("userTrain", { user: null, bookedTrain: null });
    }

    res.render("userTrain", { user, bookedTrain: user.bookedTrain });
  } catch (err) {
    console.error("Error fetching booked train:", err);
    res.status(500).send("An internal server error occurred.");
  }
};

module.exports = userBookedTrain;
