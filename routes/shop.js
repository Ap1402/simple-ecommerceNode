const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");
const productsController = require("../controllers/ProductsController");

const router = express.Router();

router.get("/", productsController.getAllProducts);

module.exports = router;
