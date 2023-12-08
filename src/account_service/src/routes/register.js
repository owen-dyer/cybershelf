const express = require("express");
const register = require("../app/register");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Register request received at ${new Date().toUTCString()}`);
  next();
});

router.route("/").post((req, res, next) => {
  register(req.body, (status) => {
    res.status(status.success ? 201 : 401).json({
      email: status.email,
    });
  });
});

module.exports = router;
