const db = require("../database/init");
const { inventory } = require("../database/sql");

// TODO: Could definitely combine some of these functions into one greater one

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

const productsById = (ids, callback) => {
  console.log(ids);
  db.manyOrNone(inventory.getById, [ids])
    .then((obj) => {
      callback(obj);
    })
    .catch((err) => {
      callback({
        error: `No products found with the given ids`,
      });
    });
};

module.exports = {
  getAllProducts,
  getFeaturedProducts,
  filterProducts,
  productsById,
};
