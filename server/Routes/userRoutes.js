const express = require("express");
const { handleSignup, handleLogin, getUserDetails } = require("../Controllers/UserController.js");

const router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.get("/", getUserDetails)

module.exports = router;