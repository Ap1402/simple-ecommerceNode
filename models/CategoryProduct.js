const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const CategoryProduct = sequelize.define(
  "categoryProduct",
  {},
  { timestamps: false }
);

module.exports = CategoryProduct;
