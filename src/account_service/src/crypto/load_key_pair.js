const rsa = require("node-rsa");
const fs = require("fs");

// If we want to do other signing/verification using the node-rsa package there is some
// additional setup for this
const privateKey = fs.readFileSync("./ssh/private.pem", "utf-8");
const publicKey = fs.readFileSync("./ssh/public.pem", "utf-8");

module.exports = {
  privateKey,
  publicKey,
};
