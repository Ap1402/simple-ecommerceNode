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
  },
  shippingAddress: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0,
  },
});

module.exports = Order;
