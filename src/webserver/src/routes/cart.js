const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").post((req, res, next) => {
  console.log(req.body);
  res.render("inventory/components/cart", {
    cart: req.body.cart,
  });
});

// TODO: Add other routes related to cart (add/remove/etc.)

module.exports = router;
