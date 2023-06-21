const express = require("express");
const productRouter = require("./router/productRoutes");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h2>Hello world!</h2>");
});
app.use('/products',productRouter);
app.listen(PORT, () => {
  console.log("API is listening on port ", PORT);
});
