const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const { app, express } = require("./app/app");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

// Third-party middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Custom middleware
app.use("/", require("./app/index"));
app.use("/verifyidtoken", require("./app/verify_id_token"));
app.use("/webserver/public_keys", require("./app/public_keys").router);
app.use("/static", express.static(path.join(__dirname, "../public")));
app.use(require("./routes/account"));
app.use("/inventory", require("./routes/inventory"));
// TODO: Add to static route
app.use(
  "/jquery",
  express.static(path.join(__dirname, "../node_modules/jquery/dist/"))
);

app.get("*", (req, res) => {
  res.status(404).render("pages/error/404");
});

app.listen(3000, () => {
  console.log("Webserver is running");
});
