const Product = require("../models/Product");

exports.postAddProduct = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    console.log(name);
    const result = await Product.create({
      name: name,
      price: price,
      description: description,
    });

    console.log(result);
    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server error");
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll(
      {
        attributes: ["id", "name", "description", "price"],
      },
      { raw: true }
    );
    return res.status(200).send(products);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.prodId, { raw: true });
    if (!product) {
      return res.status(400).send("This product does not exists");
    }
    return res.status(200).send(product);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};

// POST /admin/update-product

exports.postUpdateProduct = async (req, res, next) => {
  const { productName, price, description } = req.body;
  try {
    const product = await Product.findByPk(req.params.prodId, { raw: true });
    if (!product) {
      return res.status(400).send("This product does not exists");
    }
    product.name = productName;
    product.price = price;
    product.description = description;
    product.save();

    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};
