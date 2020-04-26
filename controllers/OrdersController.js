const Order = require("../models/Order");
const validators = require("../middleware/UserInputValidator");

exports.postCreateOrder = async (req, res, next) => {
  try {
    const { value, error } = validators.orderSchema.validate(req.body);
    if (!error) {
      const result = await Order.create({
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
