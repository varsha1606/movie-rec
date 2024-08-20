import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenreSelector = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    // Fetch genres from TMDb
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'tmdb-key' // Replace with your TMDb API key
          }
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres(prev => 
      checked ? [...prev, value] : prev.filter(id => id !== value)
    );
  };

  const handleButtonClick = () => {
    onGenreSelect(selectedGenres);
  };

  return (
    <div className="GenreSelector">
      <h2>Select Movie Genres</h2>
      <div className="genre-grid">
        {genres.map(genre => (
          <label key={genre.id}>
            <input
              type="checkbox"
              value={genre.id}
              onChange={handleCheckboxChange}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <button onClick={handleButtonClick}>Get Recommendations</button>
    </div>
  );
};

export default GenreSelector;
