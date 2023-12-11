const { PreparedStatement: PS } = require("pg-promise");

const allOrders = new PS({
  name: "get-all-orders",
  text: `SELECT id, total_price, created_at FROM orders WHERE user_id=$1;`,
});

const getOrderItems = new PS({
  name: "get-order-items",
  text: `SELECT order_id, listing_id, quantity FROM order_item WHERE order_id=ANY($1);`,
});

const addOrder = new PS({
  name: "add-order",
  text: `INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *;`,
});

module.exports = {
  orders: {
    allOrders,
    addOrder,
    getOrderItems,
  },
};
