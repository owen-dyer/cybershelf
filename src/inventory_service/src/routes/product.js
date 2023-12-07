const express = require("express");
const {
  getAllProducts,
  filterProducts,
  getFeaturedProducts,
  productsById,
} = require("../app/products");

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

router.route("/featured").get((req, res, next) => {
  getFeaturedProducts((data) => {
    res.status(200).json({
      products: data,
    });
  });
});

router.route("/filter").get((req, res, next) => {
  filterProducts(req.query.search, (data) => {
    // This shouldn't be quite right this but products and error will never exist at the same time
    res.status(data.error ? 500 : 200).json({
      filter: req.query.search,
      products: data,
      error: data.error,
    });
  });
});

router.route("/by_id").post((req, res, next) => {
  productsById(req.body.ids, (data) => {
    res.status(data.error ? 500 : 200).json({
      product: data,
      error: data.error,
    });
  });
});

module.exports = router;
