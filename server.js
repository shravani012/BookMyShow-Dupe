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
  "http://localhost:3000",
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
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(morgan("dev"));

// 🔄 Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔄 Load API Routes
console.log("🔄 Loading API routes...");
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/payment", require("./routes/paymentroutes")); // ✅ Fixed

console.log("✅ All routes loaded successfully");

// ✅ Default Route to Fix 404 on Render
app.get("/", (req, res) => {
  res.send("🚀 Server is running! Use /api for API routes.");
});

// ✅ Handle 404 for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
