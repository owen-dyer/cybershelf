const express = require("express");
const { getAccountInfo, updateAccountInfo } = require("../app/account");
const createIdToken = require("../app/create_id_token");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Account request received at ${new Date().toUTCString()}`);
  next();
});

// Main account profile page
router.route("/").get((req, res, next) => {
  getAccountInfo(req.cookies.id_token, (user) => {
    res.status(200).json(user);
  });
});

// Edit account details
router.route("/edit").post((req, res, next) => {
  updateAccountInfo(req.cookies.id_token, req.body, (user) => {
    if (user.error) {
      return res.status(500).json({
        error: user.error,
      });
    }
    createIdToken(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      (obj) => {
        res.status(201).clearCookie("id_token").json({
          id_token: obj.token,
        });
      }
    );
  });
});

// Delete account
router.route("/delete").delete((req, res, next) => {});

module.exports = router;
