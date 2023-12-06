const express = require("express");
const path = require("path");

const app = express();

app.use("/order", require("./app/create_order"));

app.get("*", (req, res) => {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Order server is running");
});
