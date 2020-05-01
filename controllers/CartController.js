const Order = require("../models/Order");
const validators = require("../middleware/UserInputValidator");
const User = require("../models/User");
const Product = require("../models/Product");

exports.addItemToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    var { quantity } = req.body;
    var cart = await req.user.getCart();
    if (!cart) {
      cart = await req.user.createCart();
    }
    if (!quantity || quantity <= 0) {
      quantity = 1;
    }

    const productData = await Product.findByPk(productId);
    if (!productData) {
      return res
        .status(404)
        .json({ errors: [{ message: "This product does not exits" }] });
    }

    const productInCart = await cart.getProducts({ where: { id: productId } });
    if (productInCart.length > 0) {
      quantity =
        parseInt(quantity) + parseInt(productInCart[0].cartItem.quantity);
    }
    cart.addProduct(productData, { through: { quantity: quantity } });
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

exports.getCurrentUserCart = async (req, res, next) => {
  try {
    var cart = await req.user.getCart();
    if (!cart) {
      return res.status(404).json({
        errors: [{ message: "You don't have any items in your cart" }],
      });
    }
    const productsInCart = await cart.getProducts();
    if (!productsInCart) {
      return res.status(404).json({
        errors: [{ message: "You don't have any items in your cart" }],
      });
    }
    return res.status(200).json(productsInCart);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};
