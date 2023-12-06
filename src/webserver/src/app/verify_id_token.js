const express = require("express");
const { getPublicKeys } = require("./public_keys");
const jwt = require("jsonwebtoken");
const { app } = require("./app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/").post((req, res, next) => {
  const id_token = req.body.id_token;
  // This should be the account server's public key specifically
  const public_key = getPublicKeys();
  // TODO: Add some error checking here in case the JWT isn't valid
  const decoded = jwt.verify(id_token, public_key);

  // Divide by 1000 because Date.now() is in milliseconds and exp is in seconds
  const now = Math.round(Date.now() / 1000);
  // Could just multiply this by 1000 and then floor it but whatever...
  const exp = decoded.exp;
  // Should be roughly one hour
  const elapsed = exp - now;

  // res.render automatically sends the html but we want to send the html and some json data
  // so we call app.render and then manually send the html
  app.render(
    "components/navigation",
    {
      authenticated: true,
      name: decoded.name,
    },
    (err, html) => {
      res
        .status(200)
        .cookie("id_token", id_token, {
          maxAge: elapsed * 1000,
        })
        .json({
          name: decoded.name,
          template: html,
        });
    }
  );
});

module.exports = router;
