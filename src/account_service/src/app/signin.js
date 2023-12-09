const { db, QueryResultError, qrec } = require("../database/init");
const { account } = require("../database/sql");
const bcrypt = require("bcryptjs");

// Temporary
const createIdToken = require("./create_id_token");

const signin = async (credentials, callback) => {
  await db
    .one(account.signin, credentials.email)
    .then((user) => {
      bcrypt.compare(
        credentials.password,
        user.password_hash,
        (err, result) => {
          if (result !== true) {
            // Invalid password but don't want to give too descriptive of an error message
            // FIXME: This error should be caught by the catch statement below
            // but instead the application crashes
            // throw Error("Invalid username or password");
            return callback({
              success: false,
              error: "Invalid username or password",
            });
          }

          createIdToken(
            {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            (obj) => {
              return callback({
                success: obj.error ? false : true,
                token: obj.token,
                error: obj.error,
              });
            }
          );
        }
      );
    })
    .catch((err) => {
      // TODO: Implement PGP error handling using error codes, etc.
      if (err instanceof QueryResultError) {
        // Really invalid email but for security purposes we are less specific
        if (err.code === qrec.noData) {
          err = "Invalid email or password";
        }
      }
      return callback({
        success: false,
        error: err,
      });
    });
};

module.exports = signin;
