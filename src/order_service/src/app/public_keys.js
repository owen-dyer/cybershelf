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

// Note that if you reload the order server the public keys will be undefined until the next request is sent from NGINX (can change the interval in default.conf to make it faster)
const getPublicKeys = () => {
  return accountServerPublicKey;
};

module.exports = {
  router,
  getPublicKeys,
};
