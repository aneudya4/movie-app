import React, { useState, useEffect } from 'react';
import TMDBLogo from './images/tmdb.svg';
import MovieHeader from './MovieHeader';
import MovieDetails from './MovieDetails';
import Poster from './Poster';
import GenreList from './GenreList';
import TypeAhead from './TypeAhead';
import Spinner from './Spinner';
import { key } from './config';
import numeral from 'numeral';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSingleMovie(577922);
    // id for movie TENET
  }, []);

  const onClick = (movie) => {
    if (movie.id !== selectedMovie.id) {
      fetchSingleMovie(movie.id);
    }
    setAllMovies([]);
  };

  const fetchSingleMovie = async (movieId) => {
    try {
      setIsLoading(true);
      const movie = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key.api_key}&language=en-US`
      );
      const movieJson = await movie.json();
      setIsLoading(false);
      setSelectedMovie(movieJson);
      setInput('');
      setAllMovies([]);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMovies = async (movieName) => {
    try {
      const movies = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US&query=${movieName}&page=1&include_adult=false`
      );
      const moviesJson = await movies.json();
      const predictedMovies = moviesJson.results.filter((movie) =>
        movie.title.toLowerCase().includes(movieName.toLowerCase().trim())
      );
      console.log(predictedMovies);
      setAllMovies(predictedMovies.filter((m, i) => i < 6));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
    if (e.target.value !== '') {
      fetchMovies(e.target.value);
    }
    setAllMovies([]);
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    await fetchMovies(input);
    await fetchSingleMovie(allMovies[0].id);
    setInput('');
    setAllMovies([]);
  };

  if (isLoading || selectedMovie.length === 0) {
    return <Spinner />;
  }
  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
      }}
    >
      <section className='search-section'>
        <img src={TMDBLogo} className='logo' alt='The Movie Database' />

        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type='text'
            name='input'
            placeholder='Search Movie Title...'
            value={input}
            autoComplete='off'
          />
          <TypeAhead movies={allMovies} onClick={onClick} />
        </form>
      </section>
      <section className='movie-details'>
        <MovieDetails className='movie-info'>
          <MovieHeader
            title={selectedMovie.title || 'Not Found'}
            overview={selectedMovie.overview}
            tagline={selectedMovie.tagline}
          />

          <GenreList genreList={selectedMovie.genres} />

          <div className='release-details'>
            <MovieDetails className={'release-info'}>
              <p>Original Release:</p>
              <span className='headlines'>{selectedMovie.release_date}</span>
            </MovieDetails>

            <MovieDetails className={'release-info'}>
              <p>Running Time:</p>
              <span className='headlines'>{selectedMovie.runtime} mins</span>
            </MovieDetails>
            <MovieDetails className={'release-info'}>
              <p>Box Office:</p>
              <span className='headlines'>
                {selectedMovie.revenue === 0
                  ? 'Not Available'
                  : numeral(selectedMovie.revenue).format('($0,0)')}
              </span>
            </MovieDetails>
            <MovieDetails className={'release-info'}>
              <p>vote Average:</p>
              <span className='headlines'>{selectedMovie.vote_average}/10</span>
            </MovieDetails>
          </div>
        </MovieDetails>

        <Poster
          poster={selectedMovie.poster_path}
          title={selectedMovie.title}
        />
      </section>
    </div>
  );
};

export default App;
