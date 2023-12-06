const express = require("express");
const { getAllProducts, filterProducts } = require("../app/products");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Product request received at ${new Date().toUTCString()}`);
  next();
});

router.route("/").get((req, res, next) => {
  getAllProducts((data) => {
    res.status(200).json({
      products: data,
    });
  });
});

router.route("/filter").get((req, res, next) => {
  filterProducts(req.query, (data) => {
    console.log(data);
    res.status(200).json({
      products: data,
    });
  });
});

module.exports = router;
