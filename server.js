const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});

console.log("🔄 Loading API routes...");
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/bookings", require("./routes/bookings"));

try {
    app.use("/api/payment", require("./routes/payment"));
    console.log("✅ PayPal payment route loaded successfully");
} catch (error) {
    console.error("❌ Failed to load payment route:", error);
}

app.get("/", (req, res) => {
    res.send("🎉 API is running successfully!");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
