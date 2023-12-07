const { db, QueryResultError, qrec } = require("../database/init");
const jwt = require("jsonwebtoken");
const { getPublicKeys } = require("../app/public_keys");
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
    db.one(cart.cartByUserId, decoded.sub)
      .then((cart_instance) => {
        db.many(cart.read, cart_instance.id)
          .then((cart_items) => {
            callback(cart_items);
          })
          .catch((err) => {
            callback({
              error: "Unable to find cart contents",
            });
          });
      })
      .catch((err) => {
        callback({
          error: "Unable to find cart associated with user",
        });
      });
  });
  });
};

module.exports = readCart;
