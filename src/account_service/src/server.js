const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.get("/account/settings", (req, res) => {
  res.render("pages/settings");
});

// This is a catch-all route. If none of the routes above get hit then this will return a 404
app.get("*", (req, res) => {
  res.status(404).render("pages/error/404");
});

app.listen(3000, () => {
  console.log("Account Server is running");
});
