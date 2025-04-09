import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from "../services/tmdbService";

const moodGenreMap = {
  Happy: [35, 10751], // Comedy, Family
  Sad: [18],          // Drama
  Thriller: [53, 27], // Thriller, Horror
  Romantic: [10749],  // Romance
  Action: [28],       // Action
};

const MoviesPage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [mood, setMood] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const [now, upcoming] = await Promise.all([
        fetchNowPlayingMovies(),
        fetchUpcomingMovies(),
      ]);
      setNowPlaying(now);
      setUpcomingMovies(upcoming);
      setFilteredMovies([...now, ...upcoming]);
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (mood === "All") {
      setFilteredMovies([...nowPlaying, ...upcomingMovies]);
    } else {
      const genreIds = moodGenreMap[mood];
      const filtered = [...nowPlaying, ...upcomingMovies].filter((movie) =>
        movie.genre_ids.some((genre) => genreIds.includes(genre))
      );
      setFilteredMovies(filtered);
    }
  }, [mood, nowPlaying, upcomingMovies]);

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    if (container) {
      const scrollAmount = container.offsetWidth;
      container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="home-container">
      {/* 🔥 Mood Selection Dropdown */}
      <div className="mood-selector">
        <label htmlFor="mood" style={{ fontWeight: "bold", marginRight: "10px" }}>
          What’s your mood today?
        </label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        >
          <option value="All">All</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Thriller">Thriller</option>
          <option value="Romantic">Romantic</option>
          <option value="Action">Action</option>
        </select>
      </div>

      {/* 🎥 Filtered Movie Recommendations */}
      <h2 className="section-title">
        {mood === "All" ? "Recommended Movies" : `Mood: ${mood}`}
      </h2>

      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("moodMovies", "left")}>
          ❮
        </button>
        <div id="moodMovies" className="movies-wrapper">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card card-common"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-details">⭐ {movie.vote_average}</p>
                <button className="view-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("moodMovies", "right")}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
