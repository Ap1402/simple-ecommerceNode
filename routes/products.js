const express = require("express");
const upload = require("../config/multer");
const auth = require("../middleware/auth");
const productsController = require("../controllers/ProductsController");
const cartController = require("../controllers/CartController");
const ordersController = require("../controllers/OrdersController");

const router = express.Router();

// GET Shows all products
// @access Public
router.get("/products", productsController.getProducts);

// Post Create product
//@access Private
router.post(
  "/products",
  auth,
  upload.single("image"),
  productsController.createProduct
);

// PUT updates product
// @access Private
router.put(
  "/products/:productId",
  auth,
  upload.single("image"),
  productsController.updateProduct
);

module.exports = router;
