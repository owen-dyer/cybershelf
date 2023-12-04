const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Authorization request received");
  next();
});

// Need to implement authorization logic to secure endpoints
router.route("/").get((req, res, next) => {
  res.status(200).json({
    message: "Authorized",
  });
});

module.exports = router;
