const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  admin_name: {
    type: String,
  },

  admin_email: {
    type: String,
  },
  admin_password: {
    type: String,
  },
});

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
