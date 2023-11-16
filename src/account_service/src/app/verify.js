const express = require("express");
const db = require("../database/init");
const { verifyCredentialsQuery } = require("../database/queries");
const app = express();

app.post("/account/verify", (req, res) => {
  const userObj = {
    email: req.body.email,
    password: req.body.password,
  };

  db.one(verifyCredentialsQuery, userObj.email)
    .then((ret) => {
      if (ret.password_hash === userObj.password) {
        return res.status(200).json({
          message: "success",
        });
      }
      throw Error("Invalid username or password");
    })
    .catch((e) => {
      return res.status(500).json({
        message: e.message || e,
      });
    });
});

module.exports = app;
