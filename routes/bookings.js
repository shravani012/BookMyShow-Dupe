const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.post("/", async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "Booking successful" });
});

module.exports = router;
