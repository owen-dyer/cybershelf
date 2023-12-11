const express = require("express");
const { getAllOrders } = require("../app/get_orders");
const { placeOrder } = require("../app/place_order");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Order request received at ${new Date().toUTCString()}`);
  next();
});

// Route to get all orders that a user has placed
router.route("/").get((req, res, next) => {
  getAllOrders(req.cookies.id_token, (orders) => {
    res.status(200).json({
      orders: orders,
    });
  });
});

// Route to place orders
router.route("/place").post((req, res, next) => {
  placeOrder(req.cookies.id_token, req.body, (data) => {
    // HTTP status should be more specific (unauthorized, server error, etc.)
    res.status(data.error ? 500 : 201).json({
      message: data.message,
      error: data.error,
    });
  });
});

// Could add update/cancel order functions but those would depend on time and shipping and other
// real-world variables which we don't have (since we aren't a real store)

module.exports = router;
