const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRETKEY);

router.post("/intent", async (req, res) => {
  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-04-10" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      customer: customer.id,
      ephemeralKey: ephemeralKey.secret,
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILED",
      error: e.message,
    });
  }
});
module.exports = router;
