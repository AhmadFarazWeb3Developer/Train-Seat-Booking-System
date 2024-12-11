const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  admin_name: {
    type: String,
  },

  admin_email: {
    type: String,
  },

  admins_phone: {
    type: String,
  },
});

const userModel = mongoose.model("admin", adminSchema);
module.exports = userModel;
