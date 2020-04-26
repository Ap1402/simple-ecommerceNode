const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  unitPrice: {
    type: Sequelize.INTEGER,
  },
  discountedAmountAtOrder: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderItem;
