const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.use("/static", express.static(path.join(__dirname, "../public")));

app.get("/orders", (req, res) => {
  res.render("pages/orders");
});

// app.get("*", (req, res) => {
//   res.status(404).render("pages/error/404");
// });

app.listen(3000, () => {
  console.log("Order server is running");
});
