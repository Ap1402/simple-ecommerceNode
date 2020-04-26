const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");
const auth = require("../middleware/auth");
const productsController = require("../controllers/ProductsController");
const cartController = require("../controllers/CartController");

const router = express.Router();

router.get("/", auth, productsController.getAllProducts);

router.post("/add-item-cart", auth, cartController.addItemToCart);

module.exports = router;
