const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const Token = require("../models/Token");
var Moment = require("moment");

module.exports = async function (req, res, next) {
  try {
    //get token from header
    const token = req.header("x-auth-token");

    // check if not token
    if (!token) {
      return res.status(401).json({
        msg: "No token, authorization denied",
      });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Checks If there's a token saved on tokens table with this user ID and checks if it is expired
    const tokenKey = await Token.findOne({
      where: {
        tokenKey: token,
        userId: decoded.user.id,
      },
    });
    if (!tokenKey || Moment(tokenKey.expiresOn).isBefore(Moment())) throw error;

    // See if user Exists
    const user = await User.findOne({
      where: {
        id: decoded.user.id,
      },
    });
    if (!user) throw error;

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
