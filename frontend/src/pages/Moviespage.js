import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from "../services/tmdbService";

const MoviesPage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const [now, upcoming] = await Promise.all([
        fetchNowPlayingMovies(),
        fetchUpcomingMovies(),
      ]);
      setNowPlaying(now);
      setUpcomingMovies(upcoming);
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

  const renderMovieSection = (title, id, movieList) => (
    <>
      <h2 className="section-title">{title}</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => scrollContainer(id, "left")}>❮</button>
        <div id={id} className="movies-wrapper">
          {movieList.map((movie) => (
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
        <button className="slider-btn right" onClick={() => scrollContainer(id, "right")}>❯</button>
      </div>
    </>
  );

  return (
    <div className="home-container">
      {renderMovieSection("Now Playing", "nowPlaying", nowPlaying)}
      {renderMovieSection("Upcoming Movies", "upcomingMovies", upcomingMovies)}
    </div>
  );
};

export default MoviesPage;
