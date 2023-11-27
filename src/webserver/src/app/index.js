const express = require("express");
const router = express.Router();

const { getPublicKeys } = require("./public_keys");
const jwt = require("jsonwebtoken");

// Middleware function that gets called for all requests to this route (not necessary but good for debugging)
router.use((req, res, next) => {
  next();
});

router.route("/").get(
  (req, res, next) => {
    // If the id token cookie is present then we pass to the next middleware function
    // which will pass name and other information with the request
    if (req.cookies.id_token) {
      next();
    } else {
      res.render("pages/index");
    }
  },
  (req, res, next) => {
    // TODO: Add other checks here for audience and other claims
    const decoded = jwt.verify(req.cookies.id_token, getPublicKeys());
    res.render("pages/index", {
      authenticated: true,
      name: decoded.name,
    });
  }
);

module.exports = router;
