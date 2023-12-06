const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

// TODO: Implement this
router.route("/").post((req, res, next) => {
  res.status(201).json({
    message: "Created order",
  });
});

module.exports = router;