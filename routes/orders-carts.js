const express = require("express");
const upload = require("../config/multer");
const auth = require("../middleware/auth");
const router = express.Router();
const cartController = require("../controllers/CartController");
const ordersController = require("../controllers/OrdersController");

router.post("/carts", auth, cartController.addItemToCart);
router.get("/carts", auth, cartController.getCurrentUserCart);
router.post("/create-order", auth, ordersController.createOrder);

module.exports = router;
