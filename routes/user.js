const express = require("express");

const usersController = require("../controllers/UsersController");
const auth = require("../middleware/auth");

const router = express.Router();

// /admin/add-product => POST
router.post("/users/login", usersController.loginUser);

// /user/register-user => POST
router.post("/users", usersController.postRegisterUser);

// Get user By id
router.get("/users/:userId", auth, usersController.getUserById);

exports.routes = router;
