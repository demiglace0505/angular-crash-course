const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

const productApi = require("./controllers/product.controller");
app.use("/api/products", productApi);

app.listen(8080);
console.log("Server up and running on PORT 8080");
