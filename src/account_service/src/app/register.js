const express = require("express");
const db = require("../database/init");
const { createUserQuery } = require("../database/queries");
// const bcrypt = require("bcrypt");
const app = express();

app.post("/account/register", async (req, res) => {
  console.log(`Email: ${req.body.email}`);

  const userObj = {
    email: req.body.email,
    firstName: req.body.first_name,
    lastName: req.body.last_name,
  };
  // Bcrypt won't work for some reason so not implementing it for now...
  //   const passwordHash = await bcrypt.hash(req.body.password, 10);

  db.one(createUserQuery, [
    userObj.email,
    userObj.firstName,
    userObj.lastName,
    req.body.password,
  ])
    .then((ret) => {
      console.log(`Successfully created user ${ret.email}`);
      return res.status(200).json({
        email: ret.email,
      });
    })
    .catch((e) => {
      console.log(`Failed to create user. ${e.message || e}`);
      return res.status(500).json({
        error: e.message || e,
      });
    });
});

module.exports = app;
