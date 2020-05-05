const Order = require("../models/Order");
const validators = require("../util/UserInputValidator");
const User = require("../models/User");
const Product = require("../models/Product");

// Post /carts
//@access Private, needs req.user from auth middleware
exports.addItemToCart = async (req, res, next) => {
  try {
    // Checking if quantity is specified.
    var { quantity } = req.body;
    if (!quantity || quantity <= 0) {
      quantity = 1;
    }

    // Checking product
    const { productId } = req.body;
    const productData = await Product.findByPk(productId);
    if (!productData) {
      return res
        .status(404)
        .json({ errors: [{ message: "This product does not exits" }] });
    }
    // Getting cart or creating new one if it's not created yet.
    var cart = await req.user.getCart();
    if (!cart) {
      cart = await req.user.createCart();
    }

    // Checking if product is already in cart
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

// Get /carts
//@access Private, needs req.user from auth middleware
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
