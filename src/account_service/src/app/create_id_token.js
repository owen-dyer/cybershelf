const jwt = require("jsonwebtoken");
const { privateKey } = require("../crypto/load_key_pair");

/*

Claims to include:
    - iss (issuer of the JWT)
    - sub (subject of the JWT)
    - aud (intended audience of the JWT)
    - exp (expiration time of the JWT)
    - iat (time the JWT was issued at)
    
    - name (name of the subject)
    - authorization
        - roles (roles that a user has so that permissions can be granted)

    *Maybe some other stuff but this is fine for now*
*/

const createIdToken = async (claims, callback) => {
  jwt.sign(
    {
      iss: "account_server", // Should be some ID or something ideally
      sub: claims.id, // Abstract user ID stored in the database
      aud: "client", // This should be the client browser I think but this is fine for now
      // IAT claim is set by default so no need to do it manually
      name: claims.name,
      email: claims.email,
    },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "1hr", // How long the token is valid for (e.g. 1 hour)
    },
    (err, token) => {
      callback({
        token: token,
        error: err,
      });
    }
  );
};

module.exports = createIdToken;
