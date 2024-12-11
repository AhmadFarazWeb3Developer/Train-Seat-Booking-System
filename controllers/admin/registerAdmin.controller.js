const adminModel = require("../../models/admin");

const registerAdmin = async (req, res) => {
  const { admin_name, admin_email, admin_password } = req.body;

  const admin = await adminModel.find();

  if (admin.length > 0) {
    const error = "You are not authorized to create another admin.";
    return res.render("error", { error });
  }

  const newAdmin = await adminModel.create({
    admin_name,
    admin_email,
    admin_password,
  });

  return res.status(201).send(newAdmin);
};

module.exports = registerAdmin;
