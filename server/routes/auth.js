const express = require("express");
const router = express.Router();

//auth-controllers
const { checkUser, createUser, login } = require("../controllers/auth-contr");

// User -- routes
router.route("/status").get(checkUser);
router.route("/register").post(createUser);
router.route("/login").post(login);

module.exports = router;
