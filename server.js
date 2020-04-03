const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

sequelize
  .sync()
  .then(result => console.log(result))
  .catch(error => console.error(error));

app.listen(3000);
