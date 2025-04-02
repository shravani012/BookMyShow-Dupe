const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin:"*" })); // Allow frontend requests
app.use(morgan("dev"));

// Database Connection
if (!MONGO_URI) {
    console.error("❌ MongoDB URI is missing. Check your .env file.");
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});

// API Routes with Logging
console.log("🔄 Loading API routes...");
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/bookings", require("./routes/bookings"));

try {
    app.use("/api/payment", require("./routes/payment"));
    console.log("✅ Payment route loaded successfully");
} catch (error) {
    console.error("❌ Failed to load payment route:", error);
}

// Health Check Route
app.get("/", (req, res) => {
    res.send("🎉 API is running successfully!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));