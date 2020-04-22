const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const app = express();
const Cart = require("./models/Cart");
const User = require("./models/User");
const OrderItem = require("./models/Order-items");
const CartItem = require("./models/Cart-items");
const Order = require("./models/Order");
const Product = require("./models/Product");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use("/shop", shopRoutes);
app.use("/user", userRoutes.routes);

Cart.belongsTo(User);
User.hasMany(Order);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsToMany(Product, { through: OrderItem });
User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

app.listen(3000);
