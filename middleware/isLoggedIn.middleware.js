const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

// const isLoggedIn = async (req, res, next) => {
//   if (!req.cookies.token) {
//     return res.send("You need to login first.");
//   } else {
//     try {
//       const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
//       console.log(decoded.email);
//       const user = await userModel
//         .findOne({ customer_email: decoded.email })
//         .select("-password");

//       if (!user) {
//         return res.send("No user found. Login or register.");
//         // res.redirect("/");
//       }
//       req.user = user;
//       next();
//     } catch (error) {
//       res.send(error);
//     }
//   }
// };

const isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.send("You need to login first.");
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded);

    const user = await userModel
      .findOne({ customer_email: decoded.email })
      .select("-password");
    if (!user) {
      console.log("No user found in database.");
      return res.send("No user found. Login or register.");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification or database error:", error);
    res.send("An error occurred. Please try again.");
  }
};

module.exports = isLoggedIn;
