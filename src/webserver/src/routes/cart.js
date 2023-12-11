const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.items = req.body.items ? req.body.items : [];
  res.locals.total_price = parseFloat(req.body.total_price).toFixed(2);
  res.locals.empty = req.body.items ? false : true;
  next();
});

router.route("/").post((req, res, next) => {
  res.render("cart/pages/cart");
});

router.route("/checkout").post((req, res, next) => {
  res.render("cart/pages/checkout");
});

module.exports = router;
