const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log(user.customer_email);
  console.log(user._id);
  console.log(process.env.SECRET_KEY);
  return jwt.sign(
    {
      email: user.customer_email,
      id: user._id,
    },
    process.env.SECRET_KEY
  );
};

module.exports = generateToken;
