const { db, QueryResultError, qrec, pgp } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { orders } = require("../database/sql");

const placeOrder = async (id_token, order, callback) => {
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this resource",
      });
    }

    // TODO: Make this atomic so that an empty order isn't placed
    db.one(orders.addOrder, [
      decoded.sub,
      parseFloat(order.total_price).toFixed(2),
    ])
      .then((order_instance) => {
        const orderItems = order.items.map((item) => {
          return Object.assign(
            {},
            { order_id: order_instance.id },
            { listing_id: item.id, price: item.price, quantity: item.quantity }
          );
        });
        const cs = new pgp.helpers.ColumnSet(
          ["order_id", "listing_id", "price", "quantity"],
          { table: "order_item" }
        );

        const itemsInsert = pgp.helpers
          .insert(orderItems, cs)
          .concat(" returning *;");

        db.many(itemsInsert)
          .then((inserted_items) => {
            callback({
              message: "Order placed. Thank you for shopping with CyberShelf",
            });
          })
          .catch((err) => {
            callback({
              error: "Failed to place order",
            });
          });
      })
      .catch((err) => {
        callback({
          error: err,
        });
      });
  });
};

module.exports = {
  placeOrder,
};
