const db = require("../database/init");
const { inventory } = require("../database/sql");

// TODO: Could definitely combine some of these functions into one greater one

const getAllListings = (callback) => {
  db.manyOrNone(inventory.allListings)
    .then((obj) => {
      callback(obj);
    })
    .catch((err) => {
      callback({
        error: "Failed to get products",
      });
    });
};

const getFeaturedListings = (callback) => {
  db.manyOrNone(inventory.featuredListings)
    .then((obj) => {
      callback(obj);
    })
    .catch((err) => {
      callback({
        error: "Failed to get products",
      });
    });
};

// TODO: Make it so keywords can be an array and can match title, description, etc.
const getListingByFilter = (keywords, callback) => {
  db.many(inventory.listingsByFilter, keywords)
    .then((listings) => {
      callback({
        listings: listings,
      });
    })
    .catch((err) => {
      callback({
        error: `No matches for '${keywords}'`,
      });
    });
};

// Technically also a filter
const getListingById = (ids, callback) => {
  db.manyOrNone(inventory.listingsById, [ids])
    .then((listings) => {
      callback({
        listings: listings,
      });
    })
    .catch((err) => {
      callback({
        error: `No products found with the given ids`,
      });
    });
};

const getListingsByCategory = (category_id, callback) => {
  db.one(inventory.categoryById, category_id)
    .then((category) => {
      console.log(category);
      db.manyOrNone(inventory.listingsByCategory, category_id)
        .then((listings) => {
          console.log(listings);
          callback({
            category: category,
            listings: listings,
          });
        })
        .catch((err) => {
          console.log(err);
          callback({
            error: err,
          });
        });
    })
    .catch((err) => {
      callback({
        error: err,
      });
    });
};

module.exports = {
  getAllListings,
  getFeaturedListings,
  getListingByFilter,
  getListingById,
  getListingsByCategory,
};
