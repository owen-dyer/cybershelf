const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

// Third-party middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Custom middleware
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use("/account/login", require("./app/login"));
app.use("/account/register", require("./app/register"));
app.use("/account", require("./app/account"));
app.use("/public_key", require("./app/public_key"));

// This is a catch-all route. If none of the routes above get hit then this will return a 404
app.get("*", (req, res) => {
  console.log(`URL: ${req.url}`);
  res.status(404).render("pages/error/404");
});

// Forgot why I was exporting this... check on later
module.exports = app.listen(3000, () => {
  console.log("Account Server is running");
});
