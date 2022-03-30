const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productApi = require("./controllers/product.controller");
app.use("/api/products", productApi);

app.listen(8080);
console.log("Server up and running on PORT 8080");
