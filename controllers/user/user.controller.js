const userModel = require("../../models/user");

const registerUser = async (req, res) => {
  const { customer_name, customer_email, customer_phone } = req.body;
  const user = await userModel.create({
    customer_name,
    customer_email,
    customer_phone,
  });
  res.redirect("/booking");
};

module.exports = registerUser;
