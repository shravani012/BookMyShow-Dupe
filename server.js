const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// ✅ Improved CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // Change this to match your frontend URL
  "https://book-my-show-dupe-git-main-shravani-joshis-projects.vercel.app/",
  "https://book-my-show-dupe-212qc6v6i-shravani-joshis-projects.vercel.app/",
  "https://book-my-show-dupe.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

app.use(morgan("dev"));

// 🔄 Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔄 Load API Routes
console.log("🔄 Loading API routes...");
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/payment", require("./routes/paymentroutes"));

console.log("✅ All routes loaded successfully");

// Test Route
app.get("/", (req, res) => {
  res.send("🎉 API is running successfully!");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
