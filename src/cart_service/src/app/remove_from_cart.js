const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { cart } = require("../database/sql");

const removeFromCart = (id_token, product_id, callback) => {
  console.log(`Product ID: ${product_id}`);
  jwt.verify(id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      console.log("Unauthorized");
      return callback({
        error: "You are not authorized to access this resource",
      });
    }
    db.one(cart.cartByUserId, decoded.sub)
      .then((cart_instance) => {
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
            callback({
              error: "Failed to remove item from cart",
            });
          });
      })
      .catch((err) => {
        console.log("Unable to find cart");
        callback({
          error: "Unable to find cart",
        });
      });
  });
};

module.exports = removeFromCart;
