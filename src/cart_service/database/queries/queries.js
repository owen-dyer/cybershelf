const addToCartQuery =
"INSERT INTO cart_item (product_id, price, quantity) VALUES ($1, $2, $3);";

module.exports = {
    addToCartQuery,
  };