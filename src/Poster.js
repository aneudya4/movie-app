import React from 'react';

export default ({ poster, title }) => {
  return (
    <div className='poster'>
      <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} />
    </div>
  );
};
