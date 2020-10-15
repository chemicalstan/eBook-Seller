const express = require("express"),
  bodyParser = require("body-parser"),
  stripeTestKey = require("./config/keys").stripeTestKey,
  stripe = require("stripe")(stripeTestKey),
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

app.use("/charge", (req, res) => {
  stripe.setPublishKey(stripeTestKey);
  const amount = 2500;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        customer: customer.id,
        description: "Web development ebook",
        amount,
        currency: "usd",
      })
    )
    .then((charge) => res.redirect("success"));
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
