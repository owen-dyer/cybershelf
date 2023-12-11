const { app, express } = require("./app/app");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

// Third-party middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// Custom middleware
app.use("/api/orders", require("./routes/orders"));
app.use("/order_server/public_keys", require("./app/public_keys").router);

// Catch all route if none of the other routes match
app.get("*", (req, res) => {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Order server is running");
});
