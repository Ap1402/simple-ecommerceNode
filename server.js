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
const Token = require("./models/Token");
const Category = require("./models/Category");
const CategoryProduct = require("./models/CategoryProduct");

const adminData = require("./routes/admin");
const ordersAndCartsRoutes = require("./routes/orders-carts");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", adminData.routes);
app.use("/", ordersAndCartsRoutes);

app.use("/", productRoutes);
app.use("/", userRoutes.routes);

Cart.belongsTo(User);
User.hasMany(Order);
User.hasOne(Cart);
Token.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsToMany(Product, { through: OrderItem });
User.hasMany(Token);
User.hasMany(Product, { foreignKey: "vendorID" });

Order.belongsTo(User);
Product.belongsToMany(Category, { through: CategoryProduct });
Category.belongsToMany(Product, { through: CategoryProduct });

sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0", null, { raw: true })
  .then((result) =>
    sequelize.sync({ force: true }).then((result) => console.log(result))
  )
  .catch((error) => console.error(error));

app.listen(3000);
