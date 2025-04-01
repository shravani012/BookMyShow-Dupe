import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNowPlayingMovies, fetchUpcomingMovies } from "../services/tmdbService";
import { eventList as eventsData } from "../pages/EventDetails"; // Corrected import
import "./Home.css";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [events, setEvents] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadMoviesAndEvents = async () => {
      setNowPlaying(await fetchNowPlayingMovies());
      setUpcomingMovies(await fetchUpcomingMovies());
setEvents(eventsData);
    };
    loadMoviesAndEvents();
  }, []);

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    const scrollAmount = container.offsetWidth;
    container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
  };

  return (
    <div className="home-container">
      {/* Now Playing Section */}
      <h2 className="section-title">Now Playing</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("nowPlaying", "left")}>❮</button>
        <div id="nowPlaying" className="movies-wrapper">
          {nowPlaying.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-details">⭐ {movie.vote_average} | 🎭 {movie.genre_ids.slice(0, 2).join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("nowPlaying", "right")}>❯</button>
      </div>

      {/* Upcoming Movies Section */}
      <h2 className="section-title">Upcoming Movies</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("upcomingMovies", "left")}>❮</button>
        <div id="upcomingMovies" className="movies-wrapper">
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-details">⭐ {movie.vote_average} | 🎭 {movie.genre_ids.slice(0, 2).join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("upcomingMovies", "right")}>❯</button>
      </div>

      {/* Events Section */}
      <h2 className="section-title">Upcoming Events</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("events", "left")}>❮</button>
        <div id="events" className="movies-wrapper">
          {events.map((event) => (
            <div key={event.id} className="movie-card" onClick={() => navigate(`/event/${event.id}`)}>
              <img src={event.image} alt={event.title} />
              <div className="movie-info">
                <p className="movie-title">{event.title}</p> {/* Corrected from event.name to event.title */}
                <p className="movie-details">📍 {event.location} | 📅 {event.date}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("events", "right")}>❯</button>
      </div>
    </div>
  );
};

export default Home;
