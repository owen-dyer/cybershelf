const express = require("express");
const { getAccountInfo, updateAccountInfo } = require("../app/account");
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Account request received at ${new Date().toUTCString()}`);
  next();
});

// Main account profile page
router.route("/").get((req, res, next) => {
  getAccountInfo(1, (user) => {
    console.log(user);
    res.status(200).json(user);
  });
});

// Edit account details
router.route("/edit").post((req, res, next) => {});

// Delete account
router.route("/delete").delete((req, res, next) => {});

module.exports = router;
