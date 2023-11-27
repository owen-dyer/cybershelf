const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log(
    `Account Settings request received at ${new Date().toUTCString()}`
  );
  next();
});

router.route("/").get((req, res, next) => {
  res.render("pages/dashboard", {
    title: "Account Dashboard",
  });
});

module.exports = router;
