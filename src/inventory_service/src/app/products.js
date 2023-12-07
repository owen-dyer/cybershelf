const db = require("../database/init");
const { inventory } = require("../database/sql");

const getAllProducts = (callback) => {
  db.manyOrNone(inventory.allProducts)
    .then((obj) => {
      callback(obj);
    })
    .catch((err) => {
      callback({
        error: "Failed to get products",
      });
    });
};

const getFeaturedProducts = (callback) => {
  db.manyOrNone(inventory.featuredProducts)
    .then((obj) => {
      callback(obj);
    })
    .catch((err) => {
      callback({
        error: "Failed to get products",
      });
    });
};

// For right now 'keywords' can only be one word
const filterProducts = (keywords, callback) => {
  db.many(inventory.filterProducts, keywords)
    .then((obj) => {
      callback(obj);
    })
    .catch((err) => {
      callback({
        error: `No matches for '${keywords}'`,
      });
    });
};

module.exports = {
  getAllProducts,
  getFeaturedProducts,
  filterProducts,
};
