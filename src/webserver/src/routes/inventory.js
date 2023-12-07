const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/browse").post((req, res, next) => {
  console.log(req.body.page);
  res.render("inventory/pages/browse_view", {
    title: req.body.page,
    products: req.body.products,
  });
});

// TODO: Add other routes related to inventory (filter view, etc.)

module.exports = router;
