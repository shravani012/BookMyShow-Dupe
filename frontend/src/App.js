import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPage from "./pages/Moviespage"; // ✅ Import Movies Page
import MovieDetails from "./pages/MovieDetails";
import BookingPage from "./pages/BookingPage";
import SeatSelection from "./pages/SeatSelection";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import AppNavbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} /> {/* ✅ New Movies Page Route */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/book/:id" element={<SeatSelection />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
      <LoginModal />
    </Router>
  );
}

export default App;