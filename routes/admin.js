const express = require("express");

const productsController = require("../controllers/ProductsController");
const usersController = require("../controllers/UsersController");
const auth = require("../middleware/auth");
const upload = require("../config/multer");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

router.get("/all-users", auth, usersController.showAllUsers);

exports.routes = router;
