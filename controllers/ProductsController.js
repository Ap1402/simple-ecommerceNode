const Product = require("../models/Product");

const validators = require("../middleware/UserInputValidator");

exports.createProduct = async (req, res, next) => {
  try {
    const { value, error } = validators.productSchema.validate(req.body);
    if (!error) {
      const imageUrl = req.file ? req.file.path : "";
      const result = await req.user.createProduct({
        name: value.name,
        price: value.price,
        description: value.description,
        imageUrl: imageUrl,
      });
      return res.status(201).json(result);
    } else {
      console.error(error);
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    if (!products) {
      return res
        .status(404)
        .json({ errors: [{ message: "There are no products registered" }] });
    }
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.prodId, { raw: true });
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ message: "This product does not exists" }] });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

// PUT /products/update

exports.updateProduct = async (req, res, next) => {
  try {
    const { value, error } = validators.productSchema.validate(req.body);
    if (!error) {
      const product = await Product.findByPk(req.params.productId);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ message: "This product does not exists" }] });
      }
      const imageUrl = req.file ? req.file.path : "";

      product.name = value.name;
      product.price = value.price;
      product.description = value.description;
      product.discountAmount = value.discountAmount;
      product.discountPercent = value.discountPercent;
      product.imageUrl = imageUrl;
      product.save();

      return res.status(200).json(product);
    } else {
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
