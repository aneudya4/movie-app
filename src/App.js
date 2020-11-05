import React, { useState, useEffect } from 'react';
import TypeAhead from './TypeAhead';
import './App.css';
const App = () => {
  const [input, setInput] = useState('');
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [typeAhead, setTypeAhead] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSingleMovie(299534);
  }, []); // <-- Have to pass in [] here!

  const onClick = (movie) => {
    fetchSingleMovie(movie.id);
  };

  const fetchSingleMovie = (movieId) => {
    setIsLoading({ isLoading: true });
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setIsLoading(false);
        setSelectedMovie(data);
        setInput('');
        setTypeAhead([]);
      });
  };

  const onChange = (e) => {
    setInput(e.target.value);
    if (e.target.value !== '') {
      validateMovieSearch();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchMovies(input);
  };

  const validateMovieSearch = () => {
    if (input !== '') {
      fetchMovies(input);
    } else {
      setTypeAhead([]);
    }
  };
  const fetchMovies = (value) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US&query=${value}&page=1&include_adult=false`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setTypeAhead(data.results.filter((m, i) => i < 6));
        setIsLoading(false);
      });
  };

  const beautifyGenreList = (genreList) => {
    let genresArr = genreList ? genreList.map((genre) => genre.name) : [];
    return genresArr.join(', ');
  };

  if (isLoading || selectedMovie.length === 0) {
    return <div>MMG</div>;
  }
  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        backgroundAttachment: 'fixed',
      }}
    >
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type='text'
          name='input'
          placeholder='Search Movie Title...'
          value={input}
        />
        <TypeAhead movies={typeAhead} onClick={onClick} />
      </form>
      <section className='movie-details'>
        <div className='movie-info'>
          <h1>{selectedMovie.original_title}</h1>
          <p className='tagline headlines'>{selectedMovie.tagline}</p>
          <p>{selectedMovie.overview}</p>

          <div className='genres'>
            <span className='headlines'>
              {beautifyGenreList(selectedMovie.genres)}
            </span>
          </div>
          <div className='release-details'>
            <div className='release-info'>
              <p>Original Release:</p>
              <span className='headlines'>{selectedMovie.release_date}</span>
            </div>
            <div className='release-info'>
              <p>Running Time:</p>
              <span className='headlines'>{selectedMovie.runtime} mins</span>
            </div>
            <div className='release-info'>
              <p>Box Office:</p>
              <span className='headlines'>{selectedMovie.revenue}</span>
            </div>
            <div className='release-info'>
              <p>vote Average:</p>
              <span className='headlines'>{selectedMovie.vote_average}/10</span>
            </div>
          </div>
        </div>

        <div className='poster'>
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
          />
        </div>
      </section>
    </div>
  );
};

export default App;
