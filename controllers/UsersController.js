const User = require("../models/User");
const Token = require("../models/Token");

const validators = require("../middleware/UserInputValidator");
const jwt = require("jsonwebtoken");
const config = require("config");
var Moment = require("moment");

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

exports.showAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { value, error } = validators.userSchema.validate(req.body, {
      context: { login: true },
    });

    if (!error) {
      const user = await User.findOne({
        where: { email: value.email },
      });
      if (user && user.comparePassword(value.password)) {
        const token = jwt.sign(
          { user: { id: user.id } },
          config.get("jwtSecret")
        );
        //user.tokens = user.tokens.concat({ token });
        //await user.save();
        const result = await user.createToken({
          tokenKey: token,
          expiresOn: Moment().add("5", "d"),
        });
        return res.status(200).json(token);
      }
      return res.status(200).send("There is a problem with your credentials");
    } else {
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server error");
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params.user_id;
    const user = await User.findOne({ where: { id: userId } });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};
