import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNowPlayingMovies, fetchUpcomingMovies } from "../services/tmdbService";

const MoviesPage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      setNowPlaying(await fetchNowPlayingMovies());
      setUpcomingMovies(await fetchUpcomingMovies());
    };
    loadMovies();
  }, []);

  const scrollContainer = (id, direction) => {
    const container = document.getElementById(id);
    if (container) {
      const scrollAmount = container.offsetWidth;
      container.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="movies-container">
      {/* Now Playing Movies */}
      <h2 className="section-title">Now Playing</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("nowPlaying", "left")}>❮</button>
        <div id="nowPlaying" className="movies-wrapper">
          {nowPlaying.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-details">⭐ {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("nowPlaying", "right")}>❯</button>
      </div>

      {/* Upcoming Movies */}
      <h2 className="section-title">Upcoming Movies</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer("upcomingMovies", "left")}>❮</button>
        <div id="upcomingMovies" className="movies-wrapper">
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-details">⭐ {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => scrollContainer("upcomingMovies", "right")}>❯</button>
      </div>
    </div>
  );
};

export default MoviesPage;
