const express = require("express");
const path = require("path");

const app = express();

// Custom middleware functions
app.use("/categories", require("./app/categories"));

app.get("*", (req, res) => {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Inventory Server is running");
});
