const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
require("dotenv").config(); // Ensure your .env file is loaded

// Check if API keys are defined
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("❌ Razorpay API keys missing. Check your .env file.");
    process.exit(1); // Exit process if keys are missing
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
router.post("/razorpay", async (req, res) => {
    try {
        const { amount } = req.body;
        
        // Validate amount
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("❌ Razorpay Error:", error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
});

// Test Route
router.get("/", (req, res) => {
    res.send("✅ Payment API is working!");
});

module.exports = router;
