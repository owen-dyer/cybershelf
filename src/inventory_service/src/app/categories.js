const db = require("../database/init");
const { inventory } = require("../database/sql");

const getAllCategories = (callback) => {
  db.manyOrNone(inventory.allCategories)
    .then((categories) => {
      callback({
        categories: categories,
      });
    })
    .catch((err) => {
      callback({
        error: "Failed to get categories",
      });
    });
};

const getCategoriesById = (category_ids, callback) => {
  db.manyOrNone(inventory.categoriesById, [category_ids])
    .then((categories) => {
      callback({
        categories: categories,
      });
    })
    .catch((err) => {
      callback({
        error: "Failed to find category",
      });
    });
};

module.exports = {
  getAllCategories,
  getCategoriesById,
};
