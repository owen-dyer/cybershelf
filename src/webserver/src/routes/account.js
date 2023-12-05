const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

// Router middleware, all requests going to this router will go through this
router.use((req, res, next) => {
  next();
});

// Route for account home page/profile
router.route("/").get((req, res, next) => {
  res.render("account/account");
});

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
    "components/navigation",
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
