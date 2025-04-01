const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/bookings");
const paymentRoutes = require("./routes/payment");

require("dotenv").config();

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
