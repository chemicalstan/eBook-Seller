const express = require("express"),
  bodyParser = require("body-parser"),
  stripeSecretKey = require("./config/keys").stripeSecretKey,
  stripe = require("stripe")(stripeSecretKey);
exphbs = require("express-handlebars");

const app = express();
const port = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.end("Hello world");
});

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
