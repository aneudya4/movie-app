import React, { Component } from 'react';
import './App.css';
import movie from './movie.json';
class App extends Component {
  state = {
    movies: movie,
    selected: movie,
  };
  render() {
    const { selected } = this.state;
    return (
      <div
        className='App'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${selected.backdrop_path})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <form>
          <input type='text' placeholder='Search Movie Title...' />
        </form>

        <section className='movie-details'>
          <div className='movie-info'>
            <h1>{selected.original_title}</h1>
            <p className='tagline headlines'>{selected.tagline}</p>
            <p>{selected.overview}</p>

            <div className='genres'>
              {selected.genres.map((genre) => (
                <span className='headlines' key={genre.id}>
                  {genre.name},
                </span>
              ))}
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
