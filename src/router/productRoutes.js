const express = require("express");
const router = express.Router();
const { getAllProducts, getProduct } = require("../database/products");
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send({ status: "OK", data: products });
  } catch (error) {
    res.status(500).send({ status: "FAILED", message: `${error}` });
  }
});
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await getProduct(productId);
    if (!product) {
      return res.status(404).send({ status: "FAILED", message: `Product not found` });
    }
    res.send({ status: "OK", data: product });
  } catch (error) {
    res.status(400).send({ status: "FAILED", message: `${error}` });
  }
});

module.exports = router;
