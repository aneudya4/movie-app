import React from 'react';

export default ({ genreList }) => {
  const beautifyGenreList = (genreList) => {
    let genresArr = genreList ? genreList.map((genre) => genre.name) : [];
    return genresArr.join(', ');
  };
  return (
    <div className='genres'>
      <span className='headlines'>{beautifyGenreList(genreList)}</span>
    </div>
  );
};
