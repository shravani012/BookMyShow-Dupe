import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

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
import EventSeatSelection from "./pages/EventSeatSelection";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Load user email from localStorage on first render
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setUser(savedEmail);
    }
  }, []);

  // ✅ Login handler with API
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        setUser(email);
        alert("✅ Login successful!");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Login failed");
    }
  };

  // ✅ Signup handler with API
  const handleSignup = async (name, email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userEmail", email);
        setUser(email);
        alert("✅ Signup successful!");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("❌ Signup failed");
    }
  };

  return (
    <Router>
      <AppNavbar
        onLoginClick={() => setShowLogin(true)}
        user={user}
      />

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

      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        handleLogin={handleLogin}
        switchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      <SignupModal
        show={showSignup}
        handleClose={() => setShowSignup(false)}
        handleSignup={handleSignup}
        switchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </Router>
  );
}

export default App;