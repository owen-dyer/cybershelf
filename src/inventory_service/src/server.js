const path = require("path");
const bodyParser = require("body-parser");

const { app, express } = require("./app/app");

// Third-party middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Custom middleware functions
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/product"));

app.get("*", (req, res) => {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Inventory Server is running");
});
