const express = require("express");
const readCart = require("../app/read_cart");
const { addToCart } = require("../app/add_to_cart");
const { removeFromCart, clearCart } = require("../app/remove_from_cart");
const updateItemQuantity = require("../app/update_cart");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Cart request received at ${new Date().toUTCString()}`);
  next();
});

// Route to get the contents of the user's cart
router.route("/").get((req, res, next) => {
  readCart(req.cookies.id_token, (cart) => {
    res.status(cart.error ? 500 : 200).json({
      items: cart.items,
      total_price: cart.items.length ? cart.total_price : 0,
      error: cart.error,
    });
  });
});

// Route to add an item to the user's cart
router.route("/add").post((req, res, next) => {
  const id_token = req.cookies.id_token;
  if (!id_token) {
    return res.status(401).json({
      error: "Please sign in to add items to your cart",
    });
  }
  const info = {
    id_token: id_token,
    listing: req.body.listings,
  };
  addToCart(info, (data) => {
    res.status(201).json({
      data: data,
    });
  });
});

router.route("/update").put((req, res, next) => {
  updateItemQuantity(
    req.cookies.id_token,
    req.body.listing_id,
    req.body.quantity,
    (data) => {
      res.status(data.error ? 500 : 201).json({
        item: data.item,
        total_price: data.total_price,
        error: data.error,
      });
    }
  );
});

router.route("/remove").delete((req, res, next) => {
  removeFromCart(req.cookies.id_token, req.body, (data) => {
    res.status(data.error ? 500 : 201).json(data);
  });
});

router.route("/clear").delete((req, res, next) => {
  clearCart(req.cookies.id_token, (data) => {
    res.status(data.error ? 500 : 201).json(data);
  });
});

module.exports = router;
