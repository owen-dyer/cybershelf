const express = require("express");
const readCart = require("../app/read_cart");
const addToCart = require("../app/add_to_cart");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Cart request received at ${new Date().toUTCString()}`);
  next();
});

// Route to get the contents of the user's cart
router.route("/").get((req, res, next) => {
  readCart(req.cookies.id_token, (cart) => {
    console.log(cart);
    res.status(cart.error ? 500 : 200).json({
      cart: cart,
    });
  });
});

// Route to add an item to the user's cart
router.route("/add").post((req, res, next) => {
  const id_token = req.cookies.id_token;
  if (!id_token) {
    return res.status(401).json({
      message: "You are not authorized to access this resource",
    });
  }
  const info = {
    id_token: id_token,
    product: req.body.product,
  };
  addToCart(info, (data) => {
    res.status(201).json({
      data: data,
    });
  });
});

router.route("/remove").delete((req, res, next) => {
  res.status(201).json({
    message: "Remove an item from the user's cart",
  });
});

module.exports = router;
