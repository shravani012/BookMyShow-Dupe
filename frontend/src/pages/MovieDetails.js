import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  fetchMovieDetails, 
  fetchMovieCredits, 
  fetchRecommendedMovies, 
  fetchMovieReviews 
} from "../services/tmdbService";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [castOffset, setCastOffset] = useState(0);
  const [recommendedOffset, setRecommendedOffset] = useState(0);
  const slideWidth = 200; // Adjust based on actual item width

  useEffect(() => {
    const loadMovieData = async () => {
      const movieData = await fetchMovieDetails(id);
      setMovie(movieData);

      const castData = await fetchMovieCredits(id);
      setCast(castData);

      const recommendedData = await fetchRecommendedMovies(id);
      setRecommended(recommendedData);

      const reviewsData = await fetchMovieReviews(id);
      setReviews(reviewsData);
    };

    loadMovieData();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const handleCastSlide = (direction) => {
    const maxOffset = (cast.length - 5) * slideWidth;
    if (direction === "left" && castOffset > 0) {
      setCastOffset(castOffset - slideWidth);
    } else if (direction === "right" && castOffset < maxOffset) {
      setCastOffset(castOffset + slideWidth);
    }
  };

  const handleRecommendedSlide = (direction) => {
    const maxOffset = (recommended.length - 5) * slideWidth;
    if (direction === "left" && recommendedOffset > 0) {
      setRecommendedOffset(recommendedOffset - slideWidth);
    } else if (direction === "right" && recommendedOffset < maxOffset) {
      setRecommendedOffset(recommendedOffset + slideWidth);
    }
  };

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <button className="book-button" onClick={() => navigate(`/book/${id}`)}>
          🎟️ Book Tickets
          </button>
        </div>
      </div>

      {/* Cast Section */}
      <h2>Cast</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => handleCastSlide("left")}>❮</button>
        <div className="cast-wrapper" style={{ transform: `translateX(-${castOffset}px)` }}>
          {cast.map((actor) => (
            <div key={actor.id} className="cast-card">
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => handleCastSlide("right")}>❯</button>
      </div>

      {/* Reviews Section */}
      <h2>Reviews</h2>
      <div className="reviews-container">
        {reviews.length === 0 ? <p>No reviews available.</p> :
          (showAllReviews ? reviews : reviews.slice(0, 5)).map((review, index) => (
            <div key={index} className="review-card">
              <strong>{review.author}</strong>
              <p>{review.content.length > 200 ? review.content.slice(0, 200) + "..." : review.content}</p>
            </div>
          ))}
        {reviews.length > 5 && (
          <button onClick={() => setShowAllReviews(!showAllReviews)}>
            {showAllReviews ? "Show Less" : "See More Reviews"}
          </button>
        )}
      </div>

      {/* Recommended Movies */}
      <h2>Recommended Movies</h2>
      <div className="slider-container">
        <button className="slider-btn left" onClick={() => handleRecommendedSlide("left")}>❮</button>
        <div className="movies-wrapper" style={{ transform: `translateX(-${recommendedOffset}px)` }}>
          {recommended.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
        <button className="slider-btn right" onClick={() => handleRecommendedSlide("right")}>❯</button>
      </div>
    </div>
  );
};

export default MovieDetails;
