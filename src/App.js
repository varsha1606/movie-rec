import React, { useState } from 'react';
import axios from 'axios';
import GenreSelector from './components/GenreSelector';
import MovieList from './components/MovieList';
import './App.css'; 

const API_KEY = 'tmdb-key'; // Replace with your TMDb API key

function App() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenreSelect = async (selectedGenres) => {
    setLoading(true);
    try {
      const genreIds = selectedGenres.join(',');
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreIds
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo-t.png" alt="ReelRush Logo" className="App-logo" />
        <h1>Personalised Movie Recommendations</h1>
      </header>
      <div className="GenreSelector-container">
        <GenreSelector onGenreSelect={handleGenreSelect} />
      </div>
      {loading ? <p className="loading">Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
}

export default App;
