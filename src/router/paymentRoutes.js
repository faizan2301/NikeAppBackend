const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.SECRETKEY);

router.post("/intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      status: "FAILED",
      error: e.message,
    });
  }
});
module.exports = router;
