const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/browse").post((req, res, next) => {
  res.render("inventory/pages/browse_view", {
    title: req.body.page,
    listings: req.body.listings,
  });
});

router.route("/listing_overview").post((req, res, next) => {
  res.render("inventory/components/listing_overview", {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    price: req.body.price,
  });
});

// TODO: Add other routes related to inventory (filter view, etc.)

module.exports = router;
