import React from 'react';

const MovieHeader = ({ title, tagline, overview }) => {
  return (
    <>
      <h1>{title}</h1>
      <p className='tagline headlines'>{tagline}</p>
      <p>{overview}</p>
    </>
  );
};

export default MovieHeader;
