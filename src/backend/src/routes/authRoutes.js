const express = require("express");
const { signup, login, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// Note: The logout functionality is yet to be implemented, sessions/tokens do not exist
module.exports = router;
