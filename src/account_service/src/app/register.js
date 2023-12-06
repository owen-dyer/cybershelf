const db = require("../database/init");
const { createUserQuery } = require("../database/queries");
const bcrypt = require("bcrypt");

const register = async (accountInformation, callback) => {
  if (accountInformation.password !== accountInformation.confirmpassword) {
    return callback({
      success: false,
      error: "Password and Confirm Password do not match",
    });
  }

  bcrypt.hash(accountInformation.confirmpassword, 10, (err, hash) => {
    if (err) {
      return callback({
        success: false,
        error: err,
      });
    }

    console.log(hash);
    db.one(createUserQuery, [
      accountInformation.email,
      accountInformation.name,
      hash,
    ])
      .then((user) => {
        return callback({
          success: true,
          message: `Successfully registered ${user.email}`,
        });
      })
      .catch((err) => {
        return callback({
          success: false,
          error: err,
        });
      });
  });
};

module.exports = register;
