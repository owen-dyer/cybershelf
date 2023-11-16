const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const register = require("./app/register");
const verify = require("./app/verify");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(register);
app.use(verify);

app.get("/account/settings", (req, res) => {
  // res.render("pages/settings");
  return res.status(200).json({
    status: "success",
    message: "Account settings route is OK",
  });
});

// This is a catch-all route. If none of the routes above get hit then this will return a 404
app.get("*", (req, res) => {
  res.status(404).render("pages/error/404");
});

module.exports = app.listen(3000, () => {
  console.log("Account Server is running");
});
