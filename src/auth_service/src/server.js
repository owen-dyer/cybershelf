const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const login = require("./app/login");
app.use(login);

// This is a catch-all route. If none of the routes above get hit then this will return a 404
app.get("*", (req, res) => {
  res.status(404).render("pages/error/404");
});

module.exports = app.listen(3000, () => {
  console.log("Auth Server is running");
});
