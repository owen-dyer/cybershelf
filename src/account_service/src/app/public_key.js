const express = require("express");
const { publicKey } = require("../crypto/load_key_pair");

const router = express.Router();

router.use((req, res, next) => {
  // console.log(`Received request for public key at ${new Date().toUTCString()}`);
  next();
});

router.route("/").get((req, res, next) => {
  res.status(200).json({
    public_key: publicKey,
  });
});

module.exports = router;
