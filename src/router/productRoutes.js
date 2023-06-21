const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Get all products");
});
router.get("/:productId", async (req, res) => {
  res.send(`Get product by id ${req.params.productId}`);
});
module.exports = router;
