const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

// Return an overview of all inventory (definitely not a good thing for production but for our use case right now this is fine)
app.get("/inventory", (req, res) => {
  res.render("pages/all");
});

app.get("*", (req, res) => {
  res.status(404).render("pages/error/404");
});

app.listen(3000, () => {
  console.log("Inventory Server is running");
});
