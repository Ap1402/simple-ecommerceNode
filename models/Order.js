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
    defaultValue: 0.0,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    defaultValue: "No address provided",
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  specificationsForShipping: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
