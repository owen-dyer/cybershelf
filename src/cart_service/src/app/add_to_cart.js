const db = require("../database/init");
const queries = require("../database/sql");

const addToCart = async (fields, callback) => {
  console.log(fields);

  callback({
    message: "Can't add items to cart right now :)",
  });
};

module.exports = addToCart;
