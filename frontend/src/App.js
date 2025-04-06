import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import MoviesPage from "./pages/Moviespage";
import MovieDetails from "./pages/MovieDetails";
import BookingPage from "./pages/BookingPage";
import SeatSelection from "./pages/SeatSelection";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import AppNavbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import CategoryPage from "./pages/CategoryPage";
import EventSeatSelection from "./pages/EventSeatSelection"; // ✅ Add this import

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (email) => {
    console.log("Logged in as:", email);
  };

  const handleSignup = (data) => {
    console.log("Signed up with:", data);
  };

  return (
    <Router>
      {/* ✅ Pass modal toggles to navbar if needed */}
      <AppNavbar onLoginClick={() => setShowLogin(true)} />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/book/:id" element={<SeatSelection />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/event-booking/:id" element={<EventSeatSelection />} />
          <Route path="/events/:category" element={<CategoryPage />} />
        </Routes>
      </div>

      {/* ✅ Modals with switch logic */}
      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        handleLogin={handleLogin}
        openSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      <SignupModal
        show={showSignup}
        handleClose={() => setShowSignup(false)}
        handleSignup={handleSignup}
        openLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </Router>
  );
}

export default App;
