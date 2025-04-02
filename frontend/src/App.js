import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Home page (Movies List)
import MovieDetails from "./pages/MovieDetails"; // Movie details page
import BookingPage from "./pages/BookingPage"; // Booking page
import SeatSelection from "./pages/SeatSelection"; // Seat selection page
import Events from "./pages/Events"; // Events page
import EventDetails from "./pages/EventDetails"; // ✅ Import Event Details Page
import payment from "./components/payment";
import AppNavbar from "./components/Navbar"; // Navbar
import LoginModal from "./components/LoginModal"; // Login modal

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/book/:id" element={<SeatSelection />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} /> 
          <Route path="/payment" element={<payment />} />
        </Routes>
      </div>
      <LoginModal />
    </Router>
  );
}

export default App;
