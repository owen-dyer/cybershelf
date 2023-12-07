const express = require("express");
const account = require("..\account_service\src\database\init.js");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

// TODO: Implement this
router.route("/").post((req, res, next) => {
/*
  const orderQuery = `INSERT INTO orders (user_id, total_amount, order_date) 
    VALUES ($1, $2, $3) RETURNING order_id;`;

  db.any(orderQuery, [
    req.body.user_id,
    req.body.total_amount,
    req.body.order_date,
  ])
  // if query execution succeeds
    // send success message
    .then(function (data) {
      res.status(200).json({
        status: 'Success',
        data: data,
        message: 'Order added successfully',
      });
    })
    // if query execution fails
    // send error message
    .catch(function (err) {
      return console.log(err);
    });

  res.status(201).json({
    message: "Created order",
  }); */
});

module.exports = router;