const db = require("../database/init");
const { inventory } = require("../database/sql");

const getCategories = (filter, callback) => {
  // TODO: Add filter functionality
  db.manyOrNone(inventory.categories)
    .then((obj) => {
      callback(obj);
    })
    .catch((err) => {
      console.log(err);
      callback({
        error: "Failed to get categories",
      });
    });
};

module.exports = getCategories;
