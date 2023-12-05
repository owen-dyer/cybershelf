const express = require("express");
const { app } = require("../app/app");

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.route("/browse").get((req, res, next) => {
    res.status(200).json({
        message: "Browse featured items/all items",
    });
});

// TODO: Add other routes related to inventory (filter view, etc.)

module.exports = router;