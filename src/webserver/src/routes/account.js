const express = require("express");
const { app } = require("../app/app");

const { getPublicKeys } = require("../app/public_keys");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Router middleware, all requests going to this router will go through this
router.use((req, res, next) => {
  next();
});

// Route for account home page/profile
router.route("/account").get(
  (req, res, next) => {
    if (req.cookies.id_token) {
      next();
    } else {
      // TODO: Make it automatically pull up the sign in form on top of the current page
      res.status(401).json({
        message: "You are unauthorized",
      });
      return;
    }
  },
  (req, res, next) => {
    jwt.verify(req.cookies.id_token, getPublicKeys(), (err, decoded) => {
      if (err) {
        next();
      }
      app.render(
        "account/account",
        {
          authenticated: true,
          name: decoded.name,
          email: decoded.email,
        },
        (err, html) => {
          res.status(200).json({
            template: html,
          });
        }
      );
      return;
    });
  }
);

router.route("/register").get((req, res, next) => {
  res.render("account/register");
});

router.route("/signin").get((req, res, next) => {
  res.render("account/signin");
});

router.route("/signout").get((req, res, next) => {
  // Check if the user is signed in
  if (!req.cookies.id_token) {
    return res.status(400);
  }
  app.render(
    "pages/home",
    {
      authenticated: false,
    },
    (err, html) => {
      res.status(200).clearCookie("id_token").json({
        template: html,
      });
    }
  );
});

module.exports = router;
