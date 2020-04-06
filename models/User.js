const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

class User extends Model {
  comparePassword(password) {
    return [this.password(), password].join(" ");
  }
}

const UserModel = User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password");
      }
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "user", // We need to choose the model name
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password =
            user.password() && user.password() != ""
              ? bcrypt.hashSync(user.password(), 10)
              : "";
        }
      },
      beforeUpdate: (user, options) => {
        {
          user.password =
            user.password() && user.password() != ""
              ? bcrypt.hashSync(user.password(), 10)
              : "";
        }
      }
    }
  }
);

module.exports = UserModel;
