const express = require("express");
const router = express.Router();

//auth-controllers
const { createUser, login } = require("../controllers/auth-contr");

// User -- routes
router.route("/register").post(createUser);
router.route("/login").post(login);

module.exports = router;
