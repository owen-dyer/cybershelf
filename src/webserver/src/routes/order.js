const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

// router.route("/").get((req, res, next) => {
//   res.status(200).json({
//     message: "Render all orders that the user has placed",
//   });
// });

router.route("/").post((req, res, next) => {
  res.render("orders/components/thank_you", {
    items: req.body.items,
    total_price: parseFloat(req.body.total_price).toFixed(2),
  });
});

// TODO: Add other routes related to orders (checkout/order details/etc.)

module.exports = router;
