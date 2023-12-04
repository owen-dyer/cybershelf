const express = require("express");
const db = require("../database/init");
const { verifyCredentialsQuery } = require("../database/queries");

const router = express.Router();

// Temporary
const createIdToken = require("./create_id_token");

router.use((req, res, next) => {
  console.log(`Signin request received at ${new Date().toUTCString()}`);
  next();
});

router
  .route("/")
  // Potentially move some of this logic to the auth server so that this service only verifies that credentials are valid and the auth service does everything else
  .post((req, res, next) => {
    const userObj = {
      email: req.body.email,
      password: req.body.password,
    };

    db.one(verifyCredentialsQuery, userObj.email)
      .then((obj) => {
        if (obj.password_hash === userObj.password) {
          return res.status(201).json({
            status: "success",
            id_token: createIdToken({
              id: obj.id,
              name: obj.name,
            }),
          });
        }
        throw Error("Invalid username or password");
      })
      .catch((e) => {
        // TODO: Implement PGP error handling using error codes, etc.
        return res.status(401).json({
          status: "Authentication failed",
          error: e.message || e,
        });
      });
  });

module.exports = router;
