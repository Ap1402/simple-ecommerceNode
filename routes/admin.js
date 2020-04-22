const express = require("express");

const productsController = require("../controllers/ProductsController");
const usersController = require("../controllers/UsersController");

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

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

// /admin/update-product => POST
router.post("/update-product", productsController.postUpdateProduct);

router.get("/", productsController.getAllProducts);

router.get("/:prodId", productsController.getProductById);

exports.routes = router;
