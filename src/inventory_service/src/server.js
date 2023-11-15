const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.get("/inventory", (req, res) => {
  res.render("pages/index");
});

app.get("*", (req, res) => {
  res.status(404).render("pages/error/404");
});

app.listen(3000, () => {
  console.log("Inventory Server is running");
});
