const express = require("express");
const router = express.Router();

// Router middleware, all requests going to this router will go through this
router.use((req, res, next) => {
  next();
});

// Route for account home page/profile
router.route("/").get((req, res, next) => {
  res.render("account/account");
});

router.route("/signin").get((req, res, next) => {
  res.render("account/signin");
});

router.route("/register").get((req, res, next) => {
  res.render("account/register");
});

module.exports = router;
