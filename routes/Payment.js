const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

router.post("/paypal", async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{ amount: { currency_code: "INR", value: amount.toString() } }],
  });

  try {
    const order = await client.execute(request);
    res.json({ approvalUrl: order.result.links.find(link => link.rel === "approve").href });
  } catch (error) {
    res.status(500).json({ message: "PayPal payment failed", error });
  }
});

module.exports = router;
