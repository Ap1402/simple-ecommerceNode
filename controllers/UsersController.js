const User = require("../models/User");
const validators = require("../middleware/UserInputValidator");

exports.postRegisterUser = async (req, res, next) => {
  try {
    const { value, error } = validators.userSchema.validate(req.body);
    if (!error) {
      const result = await User.create({
        name: value.name,
        username: value.username,
        email: value.email,
        password: value.password,
      });
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err.errors);
    return res.status(400).json({ errors: err.errors });
  }
};

exports.getRegisterUser = async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

exports.postLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email },
    });
    if (user && user.comparePassword(password)) {
      return res.status(200).json(user);
    }
    return res.status(200).send("There is a problem with your credentials");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server error");
  }
};

exports.getLoginUser = async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};
