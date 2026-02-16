// express server

const express = require('express');

const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

// app.get('/', (req, res) => {
//     res.send("Hello");
// });

module.exports = app;