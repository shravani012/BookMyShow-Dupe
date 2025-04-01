const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    paymentStatus: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Booking", BookingSchema);
