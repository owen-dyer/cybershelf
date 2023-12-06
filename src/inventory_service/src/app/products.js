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
  db.manyOrNone(inventory.filterProducts, keywords)
    .then((obj) => {
      console.log(obj);
      callback(obj);
    })
    .catch((err) => {
      callback({
        error: "Unable to find products that match the given keyword",
      });
    });
};

module.exports = {
  getAllProducts,
  getFeaturedProducts,
  filterProducts,
};
