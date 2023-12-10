const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { cart } = require("../database/sql");
const { updateCartTotal } = require("./add_to_cart");

const updateItemQuantity = async (id_token, listing_id, quantity, callback) => {
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this resource",
      });
    }

    db.one(cart.cartByUserId, decoded.sub)
      .then((cart_instance) => {
        const cart_id = cart_instance.id;
        db.manyOrNone(cart.read, cart_id)
          .then((cart_items) => {
            const obj = cart_items.find(
              (item) => item.listing_id === parseInt(listing_id)
            );

            if (!obj) {
              return callback({
                error: "Failed to find item",
              });
            }

            // NOTE: Doesn't work perfectly becaues doesn't account for going negative (3 -> -1 = -4 net change)
            if (obj.quantity + parseInt(quantity) < 0) {
              return callback({
                error: "Please specify a valid quantity",
              });
            }

            // TODO: Add check to remove item from cart if quantity = 0
            const toUpdate = parseInt(quantity) - obj.quantity;

            db.one(cart.updateItemQuantity, [cart_id, listing_id, toUpdate])
              .then((updated_item) => {
                updateCartTotal(
                  cart_id,
                  toUpdate * updated_item.price,
                  (updated_cart) => {
                    return callback({
                      item: updated_item,
                      total_price: updated_cart.total_price,
                    });
                  }
                );
              })
              .catch((err) => {
                callback({
                  error: "Failed to update item quantity",
                });
              });
          })
          .catch((err) => {
            callback({
              error: "Failed to find item",
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

module.exports = updateItemQuantity;
