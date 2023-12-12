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

const getCategoryById = (category_id, callback) => {
  db.manyOrNone(inventory.categoryById, category_id)
    .then((category) => {
      callback({
        category: category,
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
  getCategoryById,
};
