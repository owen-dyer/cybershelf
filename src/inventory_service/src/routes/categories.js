const express = require("express");
const { getAllCategories, getCategoryById } = require("../app/categories");
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Category request received at ${new Date().toUTCString()}`);
  next();
});

router.route("/").get((req, res, next) => {
  getAllCategories((categories) => {
    res.status(categories.error ? 500 : 200).json(categories);
  });
});

router.route("/by_id").post((req, res, next) => {
  getCategoryById(req.body.id, (category) => {
    res.status(category.error ? 500 : 200).json(category);
  });
});

module.exports = router;
