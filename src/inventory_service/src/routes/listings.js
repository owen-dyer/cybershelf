const express = require("express");
const {
  getAllListings,
  getFeaturedListings,
  getListingByFilter,
  getListingById,
  getListingsByCategory,
} = require("../app/listings");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Listing request received at ${new Date().toUTCString()}`);
  next();
});

router.route("/").get((req, res, next) => {
  getAllListings((listings) => {
    res.status(200).json(listings);
  });
});

router.route("/featured").get((req, res, next) => {
  getFeaturedListings((listings) => {
    res.status(200).json(listings);
  });
});

router.route("/filter").get((req, res, next) => {
  getListingByFilter(req.query.search, (obj) => {
    // This isn't quite right this but products and error will never exist at the same time
    res.status(obj.error ? 500 : 200).json({
      filter: req.query.search,
      products: obj.listings,
      error: obj.error,
    });
  });
});

router.route("/by_id").post((req, res, next) => {
  getListingById(req.body.ids, (obj) => {
    res.status(obj.error ? 500 : 200).json({
      listings: obj.listings,
      error: obj.error,
    });
  });
});

router.route("/by_category").post((req, res, next) => {
  getListingsByCategory(req.body.category_id, (obj) => {
    console.log("Object:");
    console.log(obj);
    res.status(obj.error ? 500 : 200).json(obj);
  });
});

module.exports = router;
