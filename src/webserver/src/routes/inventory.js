const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/browse").post((req, res, next) => {
  // console.log(req.body.page);
  res.render("inventory/pages/browse_view", {
    title: req.body.page,
    products: req.body.products,
  });
});

router.route("/product_overview").post((req, res, next) => {
  console.log(req.body);
  res.render("inventory/components/product_overview", {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
  });
});

// TODO: Add other routes related to inventory (filter view, etc.)

module.exports = router;
