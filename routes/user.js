const express = require("express");

const usersController = require("../controllers/UsersController");

const router = express.Router();

// /admin/add-product => POST
router.post("/login", usersController.loginUser);

// /user/register-user => POST
router.post("/register-user", usersController.postRegisterUser);

exports.routes = router;
