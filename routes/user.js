const express = require("express");

const usersController = require("../controllers/UsersController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/users/login", usersController.loginUser);

router.post("/users", usersController.postRegisterUser);

router.get("/users", usersController.showUsers);

// Get user By id
router.get("/users/:userId", auth, usersController.getUserById);

exports.routes = router;
