const express = require("express");
const signin = require("../app/signin");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Signin request received at ${new Date().toUTCString()}`);
  next();
});

/*
NOTE:
To sign in you need:
- email
- password
*/
router.route("/").post((req, res, next) => {
  signin(req.body, (status) => {
    res.status(status.success ? 200 : 401).json({
      id_token: status.token,
      error: status.error,
    });
  });
});

module.exports = router;
