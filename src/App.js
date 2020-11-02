import React, { Component } from 'react';
import TypeAhead from './TypeAhead';
import './App.css';
class App extends Component {
  state = {
    selected: null,
    typeAhead: [],
    input: '',
    isLoading: true,
  };

  componentDidMount() {
    this.fetchSingleMovie(299534);
  }

  onClick = (movie) => {
    this.fetchSingleMovie(movie.id);
  };

  fetchSingleMovie = (movieId) => {
    this.setState({ isLoading: true });
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) =>
        this.setState({
          selected: data,
          input: '',
          typeAhead: [],
          isLoading: false,
        })
      );
  };

  onChange = (e) => {
    this.setState({ input: e.target.value });
    if (e.target.value === '') {
      this.setState({ typeAhead: [] });
    }
    if (e.target.value !== '') {
      this.fetchMovies(e.target.value);
    }
  };
  fetchMovies = (value) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US&query=${value}&page=1&include_adult=false`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) =>
        this.setState({ typeAhead: data.results.filter((m, i) => i < 6) })
      );
  };

  beautifyGenreList = (genreList) => {
    let genresArr = [],
      resultString;
    if (genreList) {
      genreList.forEach(function (genre) {
        genresArr.push(genre.name);
      });
    }
    resultString = genresArr.join(', ');
    return resultString;
  };
  render() {
    const { selected, isLoading } = this.state;
    if (isLoading) {
      return <div> Loading </div>;
    }
    return (
      <div
        className='App'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${selected.backdrop_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%;',
          backgroundAttachment: 'fixed',
        }}
      >
        <form>
          <input
            onChange={this.onChange}
            type='text'
            name='input'
            placeholder='Search Movie Title...'
            value={this.state.input}
          />
          <TypeAhead movies={this.state.typeAhead} onClick={this.onClick} />
        </form>
        <section className='movie-details'>
          <div className='movie-info'>
            <h1>{selected.original_title}</h1>
            <p className='tagline headlines'>{selected.tagline}</p>
            <p>{selected.overview}</p>

            <div className='genres'>
              <span className='headlines'>
                {this.beautifyGenreList(selected.genres)}
              </span>
            </div>
            <div className='release-details'>
              <div className='release-info'>
                <p>Original Release:</p>
                <span className='headlines'>{selected.release_date}</span>
              </div>
              <div className='release-info'>
                <p>Running Time:</p>
                <span className='headlines'>{selected.runtime} mins</span>
              </div>
              <div className='release-info'>
                <p>Box Office:</p>
                <span className='headlines'>{selected.revenue}</span>
              </div>
              <div className='release-info'>
                <p>vote Average:</p>
                <span className='headlines'>{selected.vote_average}/10</span>
              </div>
            </div>
          </div>

          <div className='poster'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${selected.poster_path}`}
              alt={selected.title}
            />
          </div>
        </section>
      </div>
    );
  }
}
export default App;
