const express = require("express");

const usersController = require("../controllers/UsersController");

const router = express.Router();

// /admin/add-product => GET
router.get("/login", usersController.getLoginUser);

// /admin/add-product => POST
router.post("/login", usersController.postLoginUser);

exports.routes = router;
