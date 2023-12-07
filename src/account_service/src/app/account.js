const db = require("../database/init");
const jwt = require("jsonwebtoken");
const { publicKey } = require("../crypto/load_key_pair");
const { account } = require("../database/sql");
const bcrypt = require("bcrypt");

// TODO: Implement authorization stuff so that this is secure
// For just just gonna check the account id in the JWT cuz whatever
const getAccountInfo = async (token, callback) => {
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this",
      });
    }
    db.one(account.details, decoded.sub)
      .then((user) => {
        callback(user);
      })
      .catch((err) => {
        callback(err);
      });
  });
};

const updateAccountInfo = async (token, field, callback) => {
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      return callback({
        error: "You are not authorized to access this",
      });
    }

    // Update account info
    const key = Object.keys(field).at(0);
    if (key === "name") {
      db.one(account.updateName, [decoded.sub, field.name])
        .then((obj) => {
          callback(obj);
        })
        .catch((err) => {
          callback({
            error: "Failed to update account information",
          });
        });
    } else if (key === "email") {
      db.one(account.updateEmail, [decoded.sub, field.email])
        .then((obj) => {
          console.log(obj);
          callback(obj);
        })
        .catch((err) => {
          callback({
            error: "Failed to update account information",
          });
        });
    } else if (key === "password") {
      bcrypt.hash(field.password, 10, (err, hash) => {
        if (err) {
          return callback({
            error: "Failed to update password",
          });
        }
        db.one(account.updatePassword, [decoded.sub, hash])
          .then((obj) => {
            callback(obj);
          })
          .catch((err) => {
            callback({
              error: "Failed to update account information",
            });
          });
      });
    }
  });
};

module.exports = {
  getAccountInfo,
  updateAccountInfo,
};
