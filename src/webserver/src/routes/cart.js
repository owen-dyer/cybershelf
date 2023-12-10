const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").post((req, res, next) => {
  res.render("inventory/components/cart", {
    items: req.body.items ? req.body.items : [],
    total_price: parseFloat(req.body.total_price).toFixed(2),
    empty: req.body.items ? null : "Cart is empty",
  });
});

// TODO: Add other routes related to cart (add/remove/etc.)

module.exports = router;
