const User = require("../models/User");
const Token = require("../models/Token");
const validators = require("../util/UserInputValidator");
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
      return res.status(201).json(result);
    } else {
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

exports.showUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users.length == 0) {
      return res.status(404).json({ errors: [{ message: "No users found" }] });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
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

        await user.createToken({
          tokenKey: token,
        });
        return res.status(200).json({ token: token });
      }
      return res.status(400).json({
        error: [{ message: "There is a problem with your credentials" }],
      });
    } else {
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (user == null) {
      return res.status(404).json({ errors: [{ message: "User not found" }] });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // Checking if user it's trying to modify another user
    const userId = req.params.userId;
    if (!userId == req.user.id)
      return res.status(401).json({
        errors: [
          {
            message: "Oops, seems you don't have authorization to do that",
          },
        ],
      });

    const { value, error } = validators.userSchema.validate(req.body, {
      context: { login: false, update: true },
    });

    if (error)
      return res.status(400).json({ errors: [{ message: error.message }] });

    const user = await User.findByPk(userId);

    if (user == null)
      return res.status(404).json({ errors: [{ message: "User not found" }] });

    user.name = value.name;
    user.lastName = value.lastname;
    user.username = value.username;
    user.email = value.email;

    user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
