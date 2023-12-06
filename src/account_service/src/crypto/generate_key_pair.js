const rsa = require("node-rsa");
const fs = require("fs");

const generateKeyPair = () => {
  const keyPair = new rsa().generateKeyPair();
  const privateKey = keyPair.exportKey("private");
  const publicKey = keyPair.exportKey("public");

  if (fs.existsSync("../../ssh/private.pem")) {
    console.log(
      "Private key already exists. If you continue, the current private key will be overwritten."
    );
    return;
  }

  fs.openSync("../../ssh/private.pem", "w");
  fs.writeFileSync("../../ssh/private.pem", privateKey, "utf-8");

  fs.openSync("../../ssh/public.pem", "w");
  fs.writeFileSync("../../ssh/public.pem", publicKey, "utf-8");
};

// Uncomment this function call to generate a new key pair.
// If a key pair already exists, the check in the function above will
// stop the function execution.

// generateKeyPair();
