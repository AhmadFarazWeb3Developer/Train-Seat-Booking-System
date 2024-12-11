const userModel = require("../../models/user");

const userBookedTrain = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ customer_email: req.user.customer_email })
      .populate({
        path: "bookedTrain",
        populate: {
          path: "train",
          model: "train",
          select: "train_name train_type total_seats",
        },
        select: "-customer",
      });

    if (!user || !user.bookedTrain || user.bookedTrain.length === 0) {
      return res.render("userTrain", { user: null, bookedTrain: null });
    }

    res.render("userTrain", { user, bookedTrain: user.bookedTrain });
  } catch (err) {
    console.error("Error fetching booked train:", err);
    res.status(500).send("An internal server error occurred.");
  }
};

module.exports = userBookedTrain;
