const express = require("express");
const router = express.Router();

var accountServerPublicKey = "";

router.use((req, res, next) => {
  next();
});

router.route("/").get((req, res, next) => {
  accountServerPublicKey = JSON.parse(req.headers.apk).public_key;
  res.status(200);
});

// This could be used to return all public keys or could put functions inside of this and call for individual public keys
// Note that if you reload the webserver the public keys will be undefined until the next request is sent from NGINX (can change the interval in default.conf to make it faster)
const getPublicKeys = () => {
  return accountServerPublicKey;
};

module.exports = {
  router,
  getPublicKeys,
};
