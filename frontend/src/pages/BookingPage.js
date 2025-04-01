import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits, fetchRecommendedMovies } from "../services/tmdbService";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);  // Fix: Ensure cast state is initialized
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadMovieDetails = async () => {
      const movieData = await fetchMovieDetails(id);
      const castData = await fetchMovieCredits(id);
      const recommendedMovies = await fetchRecommendedMovies(id);

      setMovie(movieData);
      setCast(castData);  // Fix: Ensure cast is set
      setRecommendations(recommendedMovies);
    };

    loadMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
          <p><strong>Genre:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Fix: Only show cast if available */}
      {cast.length > 0 ? (
        <>
          <h3>Top Cast</h3>
          <div className="cast-container">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-card">
                <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/150"} alt={actor.name} />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No cast data available.</p>
      )}

      {/* Recommended Movies */}
      <h3>Recommended Movies</h3>
      <div className="recommended-container">
        {recommendations.map((rec) => (
          <div key={rec.id} className="recommended-card" onClick={() => navigate(`/movie/${rec.id}`)}>
            <img src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`} alt={rec.title} />
            <p>{rec.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
