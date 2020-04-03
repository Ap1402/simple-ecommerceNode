const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const productsController = require("../controllers/products");
const router = express.Router();


// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);

// /admin/update-product => POST
router.post("/update-product", productsController.postUpdateProduct);

// /admin/update-product => GET
router.get("/update-product/:prodId", productsController.getUpdateProduct);

router.get("/",productsController.getAllProducts)

router.get("/:prodId",productsController.getProductById)

exports.routes = router;
