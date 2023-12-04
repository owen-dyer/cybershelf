const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").get((req, res, next) => {
  res.render("pages/categories");
});

module.exports = router;