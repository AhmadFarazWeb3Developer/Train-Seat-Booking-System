const userModel = require("../models/user");

const registerUser = async (req, res) => {
  const { customer_name, customer_email, customer_phone } = req.body;
  console.log("hello problem");
  const user = await userModel.create({
    customer_name,
    customer_email,
    customer_phone,
  });
  console.log(user);
};

module.exports = registerUser;
