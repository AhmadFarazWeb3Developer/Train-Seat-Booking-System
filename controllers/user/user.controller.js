const userModel = require("../../models/user");
const generateToken = require("../../utils/generateJWT.utils");
const registerUser = async (req, res) => {
  const { customer_name, customer_email, customer_phone } = req.body;
  const user = await userModel.create({
    customer_name,
    customer_email,
    customer_phone,
  });

  const token = generateToken(user);
  console.log(token);
  res.cookie("token", token);
  res.redirect("/booking");
};

module.exports = registerUser;
