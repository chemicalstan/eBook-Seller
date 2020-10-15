const express = require("express"),
  bodyParser = require("body-parser"),
  stripe = require("stripe")(
    "sk_test_51HapQkLHRxYJ6OlKLzuzOdcLz5BKe2XkYqhbxmhczrIBMAA0zXgMW4j7GaF3fqFLMqJpBSSjtBFfIhqrk4aRjaie00rgFGZ2ie"
  ),
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
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/charge", (req, res) => {
  const amount = 2500;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        customer: customer.id,
        description: "Web development ebook",
        currency: "usd",
      })
    )
  .then((charge) =>
  res.render("success");
  // );
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
