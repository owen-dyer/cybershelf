const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.orders = req.body.orders ? req.body.orders : [];
  res.locals.noOrders = req.body.orders ? false : true;
  next();
});

router.route("/").post((req, res, next) => {
  res.render("orders/orders");
});

module.exports = router;
