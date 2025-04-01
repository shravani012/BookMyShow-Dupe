const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    price: Number,
    availableSeats: Number
});

module.exports = mongoose.model("Event", EventSchema);
