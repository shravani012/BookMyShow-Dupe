const API_KEY = "aa5b2578ada67f44c4e9ad4ea5bfbe89";
const BASE_URL = "https://api.themoviedb.org/3";

// ✅ Fetch Now Playing Movies (India)
export const fetchNowPlayingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=IN`);
  const data = await response.json();
  return data.results || []; // Ensure results exist
};

// ✅ Fetch Upcoming Movies (India)
export const fetchUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&region=IN`);
  const data = await response.json();
  return data.results || []; // Ensure results exist
};

// ✅ Fetch Movie Details
export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=genres`);
  const data = await response.json();
  return data; // Directly return the data, assuming it's correct
};

// ✅ Fetch Movie Credits (Cast)
export const fetchMovieCredits = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data.cast && data.cast.length > 0 ? data.cast.slice(0, 10) : []; // Get top 10 cast members
};

// ✅ Fetch Recommended Movies (Similar Movies)
export const fetchRecommendedMovies = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results && data.results.length > 0 ? data.results.slice(0, 10) : []; // Get top 10 recommended movies
};

// ✅ Fetch Movie Reviews
export const fetchMovieReviews = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results && data.results.length > 0 ? data.results.slice(0, 10) : []; // Limit to 10 reviews
};
