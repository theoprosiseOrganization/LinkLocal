const express = require("express");
const { signup, login, logout, me } = require("../controllers/authController");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Headers:", req.headers);
  console.log("Query:", req.query);
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  next();
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// Check if the user is logged in
router.post("/me", me);
module.exports = router;
