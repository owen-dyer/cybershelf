const axios = require("axios");
const express = require("express");
const app = express();

app.post("/auth/login", (req, res) => {
  const userObj = {
    email: req.body.email,
    password: req.body.password,
  };

  axios
    .post("http://account_server:3000/account/verify", {
      email: userObj.email,
      password: userObj.password,
    })
    .then((ret) => {
      return res.status(200).json({
        message: ret.data.message,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.response.data.message,
      });
    });
});

module.exports = app;
