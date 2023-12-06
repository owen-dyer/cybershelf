const express = require("express");
const signin = require("../app/signin");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Signin request received at ${new Date().toUTCString()}`);
  next();
});

router.route("/").post((req, res, next) => {
  signin(req.body, (status) => {
    // FIXME: JSON doesn't get sent when 401 status is returned
    res.status(status.success ? 200 : 401).json({
      id_token: status.token,
      // TODO: Add error handling with unique messages
      error: status.error,
    });
  });
});

module.exports = router;
