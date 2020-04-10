const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const app = express();
const Cart = require("./models/Cart");
const User = require("./models/User");
app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(userRoutes.routes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

Cart.belongsTo(User);
User.hasMany(Cart);

sequelize
  .sync()
  .then(result => console.log(result))
  .catch(error => console.error(error));

app.listen(3000);
