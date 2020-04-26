const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
    default: 0.0,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    default: "No address provided",
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0,
  },
  specificacionForShipping: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
