const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { cart } = require("../database/sql");
const { updateCartTotal } = require("./add_to_cart");

const removeFromCart = (id_token, listing_info, callback) => {
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this resource",
      });
    }
    db.one(cart.cartByUserId, decoded.sub)
      .then((cart_instance) => {
        db.one(cart.remove, [cart_instance.id, listing_info.listing_id])
          .then((removed_item) => {
            db.one(cart.updateTotalPrice, [
              cart_instance.id,
              -(removed_item.price * removed_item.quantity),
            ])
              .then((updated_price) => {
                callback({
                  listing_id: listing_info.listing_id,
                  total_price: updated_price.total_price,
                  message: "Successfully removed item from cart",
                });
              })
              .catch((err) => {
                callback({
                  error: "Failed to update cart total",
                });
              });
          })
          .catch((err) => {
            callback({
              error: "Failed to remove item from cart",
            });
          });
      })
      .catch((err) => {
        callback({
          error: "Unable to find cart",
        });
      });
  });
};

const clearCart = (id_token, callback) => {
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this resource",
      });
    }

    db.none(cart.clear, decoded.sub)
      .then(() => {
        callback({
          message: "Cart cleared",
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
  removeFromCart,
  clearCart,
};
