import React from 'react';

const Poster = ({ poster, title }) => {
  return (
    <div className='poster'>
      <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />
    </div>
  );
};

export default Poster;
