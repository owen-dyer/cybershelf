const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Third-party middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Custom middleware
// TODO: Clean up routing
app.use("/signin", require("./routes/signin"));
app.use("/register", require("./routes/register"));
app.use("/account", require("./routes/account"));
app.use("/public_key", require("./app/public_key"));

// This is a catch-all route. If none of the routes above get hit then this will return a 404
app.get("*", (req, res) => {
  res.status(404); // 404 if page is not found. Up to webserver to handle UX
});

// Forgot why I was exporting this... check on later
app.listen(3000, () => {
  console.log("Account Server is running");
});
