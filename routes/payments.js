const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

const router = express.Router();
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/create-order", async (req, res) => {
    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "receipt_" + Date.now()
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
});

module.exports = router;
