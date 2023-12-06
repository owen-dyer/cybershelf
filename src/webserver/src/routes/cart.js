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

// TODO: Add other routes related to cart (add/remove/etc.)

module.exports = router;
