import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNowPlayingMovies, fetchUpcomingMovies } from "../services/tmdbService";
import { eventList as eventsData } from "../pages/EventDetails";
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

  const renderMovieCard = (movie) => (
    <div key={movie.id} className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className="movie-info">
        <p className="movie-title">{movie.title}</p>
        <p className="movie-details">
          <span title="Rating">⭐ {movie.vote_average}</span> |{" "}
          <span title="Genres">🎭 {movie.genre_ids.slice(0, 2).join(", ")}</span>
        </p>
        <button className="view-button" onClick={() => navigate(`/movie/${movie.id}`)}>View Details</button>
      </div>
    </div>
  );

  const renderEventCard = (event) => (
    <div key={event.id} className="movie-card">
      <img src={event.image} alt={event.title} />
      <div className="movie-info">
        <p className="movie-title">{event.title}</p>
        <p className="movie-details">
          <span title="Location">📍 {event.location}</span> |{" "}
          <span title="Date">📅 {event.date}</span>
        </p>
        <button className="view-button" onClick={() => navigate(`/event/${event.id}`)}>View Details</button>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      {/* Now Playing */}
      <h2 className="section-title">Now Playing</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("nowPlaying", "left")}>❮</button>
        <div id="nowPlaying" className="movies-wrapper">
          {nowPlaying.map(renderMovieCard)}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("nowPlaying", "right")}>❯</button>
      </div>

      {/* Upcoming Movies */}
      <h2 className="section-title">Upcoming Movies</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("upcomingMovies", "left")}>❮</button>
        <div id="upcomingMovies" className="movies-wrapper">
          {upcomingMovies.map(renderMovieCard)}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("upcomingMovies", "right")}>❯</button>
      </div>

      {/* Events */}
      <h2 className="section-title">Upcoming Events</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("events", "left")}>❮</button>
        <div id="events" className="movies-wrapper">
          {events.map(renderEventCard)}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("events", "right")}>❯</button>
      </div>
    </div>
  );
};

export default Home;
