const Product = require("../models/Product");

exports.postAddProduct = async (req, res, next) => {
  try {
    const { productName, price, description } = req.body;
    const result = await Product.create({
      name: productName,
      price: price,
      description: description
    });

    console.log(result);
    return res.status(200).send("Correcto");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server error");
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll(
      {
        attributes: ["id", "name", "description", "price"]
      },
      { raw: true }
    );
    console.log(products);
    return res.status(200).send("Correcto");
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
    const product = await Product.findByPk(req.body.prodId);
    if (!product) {
      return res.status(400).send("This product does not exists");
    }
    product.name = productName;
    product.price = price;
    product.description = description;
    product.save();

    return res.status(200).send("Correcto");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};

// GET /admin/update-product

exports.getUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.prodId, { raw: true });
    console.log(product);
    if (!product) {
      return res.status(400).send("This product does not exists");
    }
    return res.render("./forms/update-products-form", {
      pageTitle: "Update Product",
      path: "/admin/update-product",
      productName: product.name,
      description: product.description,
      price: product.price,
      prodId: product.id
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server Error");
  }
};
