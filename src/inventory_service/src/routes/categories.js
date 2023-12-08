const express = require("express");
const { getAllCategories, getCategoriesById } = require("../app/categories");
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Category request received at ${new Date().toUTCString()}`);
  next();
});

router.route("/").get((req, res, next) => {
  getAllCategories((categories) => {
    res.status(200).json(categories);
  });
});

router.route("/by_id").post((req, res, next) => {
  getCategoriesById(req.body.ids, (categories) => {
    res.status(200).json(categories);
  });
});

module.exports = router;
