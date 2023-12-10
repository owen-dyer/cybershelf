const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { cart } = require("../database/sql");

const updateCartTotal = (cart_id, net, callback) => {
  db.one(cart.updateTotalPrice, [cart_id, net])
    .then((data) => {
      callback({
        total_price: data.total_price,
      });
    })
    .catch((err) => {
      callback({
        error: "Failed to update cart total",
      });
    });
};

// Creating a separate function for this since it will be called in multiple places
const addCartItem = (cart_id, listing, quantity, callback) => {
  db.manyOrNone(cart.read, cart_id)
    .then((cart_items) => {
      const obj = cart_items.find(
        (item) => item.listing_id === parseInt(listing.at(0).id)
      );
      if (!obj) {
        db.one(cart.add, [
          cart_id,
          listing.at(0).id,
          listing.at(0).price,
          quantity /* Need to add a quantity picker on the client */,
        ])
          .then((cart_item) => {
            updateCartTotal(cart_id, cart_item.price, (cart) => {
              return callback({
                item: cart_item,
                total_price: cart.total_price,
              });
            });
          })
          .catch((err) => {
            return callback({
              error: "Failed to add item to cart",
            });
          });
      } else {
        db.one(cart.updateItemQuantity, [cart_id, listing.at(0).id, quantity])
          .then((updated_item) => {
            updateCartTotal(
              cart_id,
              quantity * listing.at(0).price,
              (updated_cart) => {
                return callback({
                  item: updated_item,
                  total_price: updated_cart.total_price,
                });
              }
            );
          })
          .catch((err) => {
            // FIXME: This should be atomic so if one fails then everything else fails also
            callback({
              error: "Failed to update item quantity",
            });
          });
      }
    })
    .catch((err) => {
      callback({
        error: "Failed to find items",
      });
    });
};

// Since multiple services are using 'getPublicKeys' and other things a standalone authorization
// service should be created...
const addToCart = async (fields, callback) => {
  jwt.verify(fields.id_token, getPublicKeys(), (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this resource",
      });
    }
    // TODO: Should make this a task
    // Could also make it all one query with lots of joins/etc.
    db.one(cart.cartByUserId, decoded.sub)
      .then((cart_instance) => {
        // If a cart already exists then we proceed
        addCartItem(cart_instance.id, fields.listing, 1, (cart_item) => {
          console.log("Final cart item:");
          console.log(cart_item);
          callback({
            product: fields.listing,
            quantity: cart_item.item.quantity,
            total_price: cart_item.total_price,
          });
        });
      })
      .catch((err) => {
        if (err instanceof QueryResultError) {
          // Check if the cart does not exist (the query expects it to return one result)
          if (err.code !== qrec.noData) {
            return callback({
              error: "Failed to add item to cart",
            });
          }
          // Now we know that the cart does not exist so we can create a new one
          db.one(cart.create, decoded.sub)
            .then((cart_instance) => {
              // TODO: If product_id already exists increment the quantity instead of adding new row
              addCartItem(cart_instance.id, fields.listing, 1, (cart_item) => {
                callback({
                  product: fields.listing,
                  quantity: cart_item.item.quantity,
                  total_price: cart_item.total_price,
                });
              });
            })
            .catch((err) => {
              callback({
                error: "Failed to add item to cart",
              });
            });
        }
        // If cart does not exist then we create a new one and proceed
      });
  });
};

module.exports = {
  addToCart,
  updateCartTotal,
};
