const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantity: {
      type:Sequelize.INTEGER
  }
});

module.exports = CartItem;