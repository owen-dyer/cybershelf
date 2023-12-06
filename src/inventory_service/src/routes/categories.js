const express = require("express");
const getCategories = require("../app/get_categories");
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Category request received at ${new Date().toUTCString()}`);
  next();
});

router.route("/").get((req, res, next) => {
  getCategories({}, (data) => {
    res.status(200).json({
      categories: data,
    });
  });
});

module.exports = router;
