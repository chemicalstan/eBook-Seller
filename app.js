const express = require("express"),
  bodyParser = require("body-parser"),
  stripeSecretKey = require("./config/keys").stripeSecretKey,
  stripe = require("stripe")(stripeSecretKey),
  exphbs = require("express-handlebars");

const app = express();
const port = process.env.PORT || 5000;

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
app.use(express.static(`${__dirname}/public`));

// Routers
app.use("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
