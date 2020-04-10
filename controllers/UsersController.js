const User = require("../models/User");

exports.postRegisterUser = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const result = await User.create({
      name: name,
      username: username,
      email: email,
      password: password
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server error");
  }
};

exports.getRegisterUser = async (req, res, next) => {
  try {
    return res.render("./forms/register-user-form", {
      pageTitle: "Register user",
      path: "/admin/register-user"
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};

exports.postLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email }
    });
    if(user && user.comparePassword(password)){
      return res.status(200).json(user);
    }
    return res.status(200).send('There is a problem with your credentials');
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server error");
  }
};

exports.getLoginUser = async (req, res, next) => {
  try {
    return res.render("./forms/login-user-form", {
      pageTitle: "Login",
      path: "/login"
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};
