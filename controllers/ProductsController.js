const Product = require("../models/Product");
const { Op } = require("sequelize");

const validators = require("../util/UserInputValidator");

//Post /products
//@access Private, adds product and links it with current user through VendorId.
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
      return res.status(401).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

// Get /products
exports.getProducts = async (req, res, next) => {
  let where = {};
  let limit = req.query.limit ? parseInt(req.query.limit) : 50;
  let offset = req.query.skip ? parseInt(req.query.skip) : 0;
  if (req.query.name) {
    where.name = {
      [Op.like]: "%" + req.query.name,
    };
  }
  if (req.query.priceFrom) {
    where.price = {
      [Op.gte]: [req.query.priceFrom],
    };
  }
  if (req.query.priceTo) {
    where.price = {
      ...where.price,
      [Op.lte]: [req.query.priceTo],
    };
  }
  try {
    const products = await Product.findAll({
      where: where,
      limit: limit,
      offset: offset,
    });

    if (!products)
      return res
        .status(404)
        .json({ errors: [{ message: "There are no products registered" }] });

    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
// Get /products/:prodId
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.prodId, { raw: true });
    if (!product)
      return res
        .status(404)
        .json({ errors: [{ message: "This product does not exists" }] });
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

// PUT /products/update
//@access Private
exports.updateProduct = async (req, res, next) => {
  try {
    const { value, error } = validators.productSchema.validate(req.body);
    if (!error) {
      const product = await Product.findByPk(req.params.productId);

      if (!product)
        return res
          .status(404)
          .json({ errors: [{ message: "This product does not exists" }] });

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
      return res.status(401).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
