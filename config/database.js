const Sequelize = require("sequelize");
const sequelize = new Sequelize("e-commerce-nodejs", "admin", "admin", {
  host: "localhost",
  dialect: "mysql"
});

/* try {
  sequelize.authenticate();
  console.log("Connection has been established");
} catch (err) {
  console.error(err.message);
  //exit process with failure
  process.exit(1);
} */

module.exports = sequelize;
