const express = require("express");
const { signup, login, logout, me } = require("../controllers/authController");
const { date } = require("joi");

const router = express.Router();

router.use((req, res, next) => {
  if (!req.url.includes("me")) {
    fetch(`${process.env.LOGGING_SERVICE_URL}/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        query: req.query,
        params: req.params,
        body: req.body,
      }),
    });
  }
  next();
});

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// Check if the user is logged in
router.post("/me", me);
module.exports = router;
