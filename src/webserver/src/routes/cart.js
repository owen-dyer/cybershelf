const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").get((req, res, next) => {
  res.status(200).json({
    message: "Render cart with all contents",
  });
});

router.route("/addToCart").post((req, res, next) => {
  res.status(200).json({
    message: "Item successfully added",
  });
});

router.route("/removeFromCart").delete((req, res, next) => {
  res.status(200).json({
    message: "Item successfully removed",
  });
});

// TODO: Add other routes related to cart (add/remove/etc.)

module.exports = router;
