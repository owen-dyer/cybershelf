const express = require("express");
const readCart = require("../app/read_cart");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Cart request received at ${new Date().toUTCString()}`);
  next();
});

// Route to get the contents of the user's cart
router.route("/").get((req, res, next) => {
  // FIXME: Cart queries aren't working. Need to fix them (uncomment code and comment the other stuff to re-implement this)
  // readCart(5, (cart) => {
  //   console.log(cart);
  //   res.status(200).json({
  //     message: "Return the contents of the user's cart",
  //   });
  // });

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
