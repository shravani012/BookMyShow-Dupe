const express = require("express");
const paypal = require("@paypal/checkout-server-sdk");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Set PayPal environment
const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// ✅ Added GET Route for Testing
router.get("/", (req, res) => {
  res.send("✅ Payment API is working!");
});

// 🟢 1️⃣ Create PayPal Order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: { currency_code: "INR", value: amount.toString() },
      },
    ],
    application_context: {
      return_url: "http://localhost:5000/api/payment/capture-order",
      cancel_url: "http://localhost:5000/cancel",
    },
  });

  try {
    const order = await client.execute(request);
    res.json({ orderId: order.result.id });
  } catch (error) {
    console.error("❌ PayPal Order Creation Error:", error);
    res.status(500).json({ message: "PayPal payment failed", error });
  }
});

// 🟢 2️⃣ Capture PayPal Order (After Approval)
router.post("/capture-order", async (req, res) => {
  const { orderId } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json({ message: "✅ Payment successful", details: capture.result });
  } catch (error) {
    console.error("❌ PayPal Capture Error:", error);
    res.status(500).json({ message: "Payment capture failed", error });
  }
});

module.exports = router;
