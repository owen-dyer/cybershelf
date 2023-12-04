const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log(
    `Account Settings request received at ${new Date().toUTCString()}`
  );
  next();
});

router.route("/").get((req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Account settings response",
  });
});

module.exports = router;
