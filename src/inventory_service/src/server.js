const path = require("path");

const { app, express } = require("./app/app");

// Custom middleware functions
app.use("/categories", require("./routes/categories"));

app.get("*", (req, res) => {
  res.status(404);
});

app.listen(3000, () => {
  console.log("Inventory Server is running");
});
