const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").get((req, res, next) => {
  res.status(200).json({
    message: "Render all orders that the user has placed",
  });
});

// TODO: Add other routes related to orders (checkout/order details/etc.)

module.exports = router;
