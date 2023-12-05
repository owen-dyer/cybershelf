// Import Dependencies
const express = require("express");
const path = require("path");

const app = express();

// App Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

// API Routes
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get('/register', (req, res) => {
  res.render('pages/register');
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.get("/browse", (req, res) => {
  res.render("pages/browse");
});

app.get("/cart", (req, res) => {
  res.render("pages/cart");
});

app.get("/account", (req, res) => {
  res.render("pages/account");
});

app.get("/edit", (req, res) => {
  res.render("pages/edit");
});

app.get("*", (req, res) => {
  res.status(404).render("pages/error/404");
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render('pages/login', { message: 'Logged out Successfully' });
    }
  });
});

// Start Server
app.listen(3000, () => {
  console.log("UI Server is running");
});
