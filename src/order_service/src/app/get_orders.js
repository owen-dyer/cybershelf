const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { orders } = require("../database/sql");

const getAllOrders = async (id_token, callback) => {
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this resource",
      });
    }

    db.manyOrNone(orders.allOrders, decoded.sub).then((order_instances) => {
      if (!order_instances.length) {
        return callback([]);
      }
      const ids = order_instances.map((order) => order.id);
      db.many(orders.getOrderItems, [ids]).then((order_items) => {
        const orders = order_instances.map((order) => {
          order.created_at = new Date(order.created_at).toLocaleDateString();
          return Object.assign({}, order, {
            items: order_items
              .map((item) =>
                order.id === item.order_id
                  ? { listing_id: item.listing_id, quantity: item.quantity }
                  : undefined
              )
              .filter(Boolean),
          });
        });
        callback(orders);
      });
    });
  });
};

module.exports = {
  getAllOrders,
};
