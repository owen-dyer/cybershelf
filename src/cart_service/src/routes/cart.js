const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

// Route to get the contents of the user's cart
router.route("/").get((req, res, next) => {
  res.status(200).json({
    message: "Return the contents of the user's cart",
  });
});

// Route to add an item to the user's cart
router.route("/add").post((req, res, next) => {
    res.status(201).json({
        message: "Add an item to the user's cart",
    });
});

router.route("/remove").delete((req, res, next) => {
    res.status(201).json({
      message: "Remove an item from the user's cart",
    });
});

module.exports = router;