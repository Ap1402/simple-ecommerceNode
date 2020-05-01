const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");

const validators = require("../middleware/UserInputValidator");

exports.createOrder = async (req, res, next) => {
  try {
    const { value, error } = validators.orderSchema.validate(req.body);
    if (!error) {
      const cart = await req.user.getCart();
      if (!cart)
        return res.status(404).json({
          errors: [{ message: "You don't have anything in your cart" }],
        });
      const products = await cart.getProducts();
      const order = await req.user.createOrder({
        shippingAddress: value.shippingAddress,
        phoneNumber: value.phoneNumber,
        specificationsForShipping: value.specificationsForShipping,
      });

      const productsForOrder = products.map((product) => {
        product.orderItem = {
          quantity: product.cartItem.quantity,
          unitPrice: product.price,
          discountedAmountAtOrder:
            parseFloat(product.discountAmount) +
            parseFloat((product.price / 100) * product.discountPercent),
        };
        order.total =
          order.total +
          (product.orderItem.unitPrice -
            product.orderItem.discountedAmountAtOrder) *
            product.cartItem.quantity;
        return product;
      });

      await order.addProducts(productsForOrder);
      order.save();
      console.log(productsForOrder);
      return res.status(200).json(order);
    } else {
      return res.status(400).json({ errors: [{ message: error.message }] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};
