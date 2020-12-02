import React from 'react';

const Poster = ({ poster, title }) => {
  const img = poster
    ? `https://image.tmdb.org/t/p/w500/${poster}`
    : 'https://via.placeholder.com/500/FFFFFF';
  return (
    <div className='poster'>
      <img src={img} alt={title} />
    </div>
  );
};

export default Poster;
