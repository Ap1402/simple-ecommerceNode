const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  imageId: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  discountedPrice: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 1,
  },
});

module.exports = Product;
