const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    price: Number,
    availableSeats: Number,
    imageUrl: String
});

module.exports = mongoose.model("Event", EventSchema);
