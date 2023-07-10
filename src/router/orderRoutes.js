const express = require("express");
const router = express.Router();
const { getOrder, createOrder } = require("../database/orders");

router.get("/", async (req, res) => {
  try {
    res.send({ status: "OK", message: `Working` });
  } catch (error) {
    res.status(400).send({ status: "FAILED", message: `${error}` });
  }
});

router.get("/:reference", async (req, res) => {
  try {
    const order = await getOrder(req.params.reference);
    res.send({ status: "OK", data: order });
  } catch (error) {
    res.status(400).send({ status: "FAILED", message: `${error}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const order = req.body;
    const randomNumber = Math.random();
    const ref = (randomNumber + 1).toString(36).substring(7);

    order.ref = ref;
    console.log(ref);
    if (!order) {
      return res
        .status(404)
        .send({ status: "FAILED", message: `Please provide order details` });
    }
    await createOrder(order);
    res.status(201).send({ status: "OK", data: order });
  } catch (error) {
    res.status(400).send({ status: "FAILED", message: `${error}` });
  }
});
module.exports = router;
