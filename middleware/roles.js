const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user")
    .readOwn("user")
    .updateOwn("user")
    .createOwn("user")
    .readOwn("cart")
    .createOwn("cart")
    .updateOwn("cart")
    .readOwn("order")
    .createOwn("order")
    .updateOwn("order")
    .createOwn("product")
    .readOwn("product")
    .updateOwn("product")
    .deleteOwn("product")
    .readAny("user");

  ac.grant("admin")
    .extend("user")
    .createAny("user")
    .updateAny("user")
    .deleteAny("user")
    .createAny("product")
    .readAny("product")
    .updateAny("product")
    .deleteAny("product")
    .readAny("order")
    .updateAny("order")
    .deleteAny("order");

  return ac;
})();
