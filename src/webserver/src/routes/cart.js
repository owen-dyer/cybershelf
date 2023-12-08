const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").post((req, res, next) => {
<<<<<<< HEAD
  console.log(req.body);
  res.render("inventory/components/cart", {
    cart: req.body.cart,
=======
  res.render("inventory/components/cart", {
    items: req.body.items,
    total_price: parseFloat(req.body.total_price).toFixed(2),
>>>>>>> main
  });
});

// TODO: Add other routes related to cart (add/remove/etc.)

module.exports = router;
