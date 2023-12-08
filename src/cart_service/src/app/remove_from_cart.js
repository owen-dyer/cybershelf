const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { cart } = require("../database/sql");
<<<<<<< HEAD

const removeFromCart = (id_token, product_id, callback) => {
  console.log(`Product ID: ${product_id}`);
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      console.log("Unauthorized");
=======
const { updateCartTotal } = require("./add_to_cart");

const removeFromCart = (id_token, listing_info, callback) => {
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
>>>>>>> main
      return callback({
        error: "You are not authorized to access this resource",
      });
    }
    db.one(cart.cartByUserId, decoded.sub)
      .then((cart_instance) => {
<<<<<<< HEAD
        console.log(cart_instance);
        db.none(cart.remove, [cart_instance.id, product_id])
          .then((removed_item) => {
            console.log("Successfully removed item from cart");
            callback({
              product_id: product_id,
              message: "Successfully removed item from cart",
            });
          })
          .catch((err) => {
            console.log("Failed to remove item from cart");
            console.log(err);
=======
        db.none(cart.remove, [cart_instance.id, listing_info.listing_id])
          .then((removed_item) => {
            db.one(cart.updateTotalPrice, [
              cart_instance.id,
              -listing_info.price,
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
>>>>>>> main
            callback({
              error: "Failed to remove item from cart",
            });
          });
      })
      .catch((err) => {
<<<<<<< HEAD
        console.log("Unable to find cart");
=======
>>>>>>> main
        callback({
          error: "Unable to find cart",
        });
      });
  });
};

module.exports = removeFromCart;
