const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { cart } = require("../database/sql");

const readCart = async (id_token, callback) => {
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this resource",
      });
    }
    db.oneOrNone(cart.cartByUserId, decoded.sub)
      .then((cart_instance) => {
        if (!cart_instance) {
          return callback({
            items: [],
            total_price: 0,
          });
        }
        db.manyOrNone(cart.read, cart_instance.id)
          .then((cart_items) => {
            callback({
              items: cart_items,
              total_price: cart_instance.total_price,
            });
          })
          .catch((err) => {
            callback({
              error: "Failed to fetch cart",
            });
          });
      })
      .catch((err) => {
        callback({
          error: "Failed to find cart",
        });
      });
  });
};

module.exports = readCart;
