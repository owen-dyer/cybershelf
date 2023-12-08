const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
const { cart } = require("../database/sql");

<<<<<<< HEAD
// Creating a separate function for this since it will be called in multiple places
const addCartItem = (cart_id, product, callback) => {
  db.one(cart.add, [
    cart_id,
    product.at(0).id,
    "99.99" /* Need to setup listings but this is fine for now */,
    "1" /* Need to add a quantity picker on the client */,
  ])
    .then((cart_item) => {
      callback(cart_item);
=======
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
  db.one(cart.add, [
    cart_id,
    listing.at(0).id,
    listing.at(0).price,
    quantity /* Need to add a quantity picker on the client */,
  ])
    .then((cart_item) => {
      updateCartTotal(cart_id, cart_item.price, (cart) => {
        callback({
          item: cart_item,
          total_price: cart.total_price,
        });
      });
>>>>>>> main
    })
    .catch((err) => {
      callback({
        error: "Failed to add item to cart",
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
<<<<<<< HEAD
        addCartItem(cart_instance.id, fields.product, (cart_item) => {
          callback({
            product: fields.product,
            quantity: cart_item.quantity,
=======
        addCartItem(cart_instance.id, fields.listing, 1, (cart_item) => {
          callback({
            product: fields.listing,
            quantity: cart_item.item.quantity,
            total_price: cart_item.total_price,
>>>>>>> main
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
<<<<<<< HEAD
              addCartItem(cart_instance.id, fields.product, (cart_item) => {
                callback({
                  product: fields.product,
                  quantity: cart_item.quantity,
=======
              addCartItem(cart_instance.id, fields.listing, 1, (cart_item) => {
                callback({
                  product: fields.listing,
                  quantity: cart_item.item.quantity,
                  total_price: cart_item.total_price,
>>>>>>> main
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
