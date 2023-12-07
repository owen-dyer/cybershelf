const express = require("express");
const account = require("..\account_service\src\database\init.js");
const { getAccountInfo, updateAccountInfo } = require("..account_service/src/app/account");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

// TODO: Implement this
router.route("/").get((req, res, next) => {
/*
   user_id = account.getAccountInfo.user_id

  // query
  const ordersQuery = `SELECT * FROM orders WHERE user_id = ${user_id};`;

  // run query
  db.task('get-everything', task => {
    return task.any(ordersQuery);
  })
    // if query execution succeeds
    // query results can be obtained
    // as shown below
    .then(data => {
      res.status(200).json({
        data
      });
    })
    // if query execution fails
    // send error message
    .catch(err => {
      console.log('Unable to add order');
      console.log(err);
      res.status('400').json({
        error: err,
      });
    });
  */
  res.status(201).json({
    message: "Created order",
  });
});

module.exports = router;