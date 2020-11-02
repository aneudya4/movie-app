import React from 'react';

const TypeAhead = ({ movies, onClick }) => {
  return (
    <ul>
      {movies.map((movie) => {
        return (
          <li onClick={() => onClick(movie)} key={movie.id}>
            {movie.title}
          </li>
        );
      })}
    </ul>
  );
};

export default TypeAhead;
