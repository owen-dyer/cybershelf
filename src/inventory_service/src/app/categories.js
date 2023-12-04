const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").get((req, res, next) => {
  res.status(200).json({
    // This should be filled by a db query
    categories: [
      "Home Supplies",
      "Office Supplies",
      "Outdoor Equipment",
      "Cleaning Supplies",
      "Storage",
      "Decoration",
    ],
  });
});

module.exports = router;
