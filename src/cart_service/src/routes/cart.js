const express = require("express");
const readCart = require("../app/read_cart");
<<<<<<< HEAD
const addToCart = require("../app/add_to_cart");
=======
const { addToCart } = require("../app/add_to_cart");
>>>>>>> main
const removeFromCart = require("../app/remove_from_cart");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Cart request received at ${new Date().toUTCString()}`);
  next();
});

// Route to get the contents of the user's cart
router.route("/").get((req, res, next) => {
  readCart(req.cookies.id_token, (cart) => {
<<<<<<< HEAD
    console.log(cart);
=======
>>>>>>> main
    res.status(cart.error ? 500 : 200).json({
      cart: cart,
      error: cart.error,
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
<<<<<<< HEAD
    product: req.body.product,
  };
  addToCart(info, (data) => {
    res.status(201).json({
      data: data,
    });
  const id_token = req.cookies.id_token;
  if (!id_token) {
    return res.status(401).json({
      message: "You are not authorized to access this resource",
    });
  }
  const info = {
    id_token: id_token,
    product: req.body.product,
=======
    listing: req.body.listings,
>>>>>>> main
  };
  addToCart(info, (data) => {
    res.status(201).json({
      data: data,
    });
  });
});

router.route("/remove").delete((req, res, next) => {
<<<<<<< HEAD
  console.log(req.body);
  removeFromCart(req.cookies.id_token, req.body.product_id, (data) => {
    console.log(data);
=======
  removeFromCart(req.cookies.id_token, req.body, (data) => {
>>>>>>> main
    res.status(data.error ? 500 : 201).json(data);
  });
});

module.exports = router;
