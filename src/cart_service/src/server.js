const bodyParser = require("body-parser");
const path = require("path");

const { app, express } = require("./app/app");

// Third-party middleware
app.use(bodyParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Custom middleware
app.use("/api/cart", require("./routes/cart"));

// Catch all route if none of the other routes match
app.get("*", (req, res) => {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Cart server is running");
});
