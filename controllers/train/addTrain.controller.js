const trainModel = require("../../models/train");

const addTrain = async (req, res) => {
  try {
    const { train_name, train_type, total_seats } = req.body;
    await trainModel.create({
      train_name,
      train_type,
      total_seats,
    });

    res.redirect("/admin/train/all");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = addTrain;
