const Product = require("../models/Product");
exports.postAddProduct = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    console.log(name, price, description);
    console.log(req);

    res.status(200).send("Correcto");
  } catch (err) {
    console.error(err);
    res.status(400).send("problema");
  }
};
