import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div className="MovieList">
      <h2>Recommended Movies</h2>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div>
                <strong>{movie.title}</strong>
                <p>{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
