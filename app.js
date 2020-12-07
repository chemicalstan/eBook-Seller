const express = require("express"),
  bodyParser = require("body-parser"),
  keys = require("./config/keys"),
  stripe = require("stripe")(keys.stripeSecretKey),
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
  res.render("index", {
    stripePublishableKey: keys.stripePublishableKey,
  });
});

app.post("/charge", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2500,
    currency: "usd",
    payment_method_types: ["card"],
    customer: customer.id,
    description: "Web development ebook",
  });
  res.json({ client_secret: intent.client_secret });
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) => {
      stripe.charges.create({
        paymentIntent,
      });
    })
    .then((charge) => res.render("success"))
    .catch((err) => {
      throw err;
    });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
