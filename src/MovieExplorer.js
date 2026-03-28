import React, { useMemo, useState } from 'react';
import moviesData from './moviesData';
import './MovieExplorer.css';

const movieDisplayMeta = {
  1: {
    category: 'Sci-Fi',
    highlight: 'Adventure',
    details: ['Space', 'Time', 'Survival'],
  },
  2: {
    category: 'Sci-Fi',
    highlight: 'Space Opera',
    details: ['Rebels', 'Force', 'Galaxy'],
  },
  3: {
    category: 'Animation',
    highlight: 'Family',
    details: ['Journey', 'Friends'],
  },
  4: {
    category: 'Sci-Fi',
    highlight: 'Adventure',
    details: ['Space', 'Survival', 'Drama'],
  },
  5: {
    category: 'Sci-Fi',
    highlight: 'Space Adventure',
    details: ['Crew', 'Action'],
  },
};

function SearchIcon() {
  return (
    <svg className="movie-search-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      className="movie-heart-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6.716-4.35-9.192-8.087C.477 9.42 2.02 4.5 6.75 4.5c2.033 0 3.385 1.16 4.149 2.328C11.664 5.66 13.016 4.5 15.049 4.5c4.73 0 6.273 4.92 3.942 8.413C18.716 16.65 12 21 12 21Z" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg className="movie-reset-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11a8 8 0 1 1-2.343-5.657" />
      <path d="M20 4v6h-6" />
    </svg>
  );
}

function Dot() {
  return (
    <span className="movie-dot" aria-hidden="true">
      &middot;
    </span>
  );
}

function formatMovie(movie) {
  const meta = movieDisplayMeta[movie.id] || {};

  return {
    ...movie,
    category: meta.category || movie.genres[0] || 'Movie',
    highlight: meta.highlight || movie.genres[0] || 'Featured',
    details: meta.details || movie.genres.slice(1, 4),
  };
}

function MovieCard({ movie, isFavourite, onToggle }) {
  return (
    <article className="movie-card">
      <div className="movie-card-content">
        <div className="movie-title-row">
          <h3 className="movie-title">{movie.title}</h3>
          <span className="movie-meta">
            <span>{movie.year}</span>
            <Dot />
            <span>{movie.category}</span>
          </span>
        </div>

        <div className="movie-info-row">
          <span className="movie-rating">
            <span className="movie-rating-star" aria-hidden="true">
              &#9733;
            </span>
            {movie.rating.toFixed(1)}
          </span>

          <span className="movie-highlight">{movie.highlight}</span>

          <span className="movie-details">
            {movie.details.map((detail, index) => (
              <React.Fragment key={`${movie.id}-${detail}`}>
                {index > 0 && <Dot />}
                <span>{detail}</span>
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={`movie-fav-btn${isFavourite ? ' is-favourite' : ''}`}
        onClick={() => onToggle(movie.id)}
      >
        <HeartIcon filled={isFavourite} />
        <span>{isFavourite ? 'Favorited' : 'Favorite'}</span>
      </button>
    </article>
  );
}

function MovieExplorer() {
  const [query, setQuery] = useState('star');
  const [favourites, setFavourites] = useState([1, 3]);

  const formattedMovies = useMemo(() => moviesData.map(formatMovie), []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredMovies = normalizedQuery
    ? formattedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const favouriteMovies = formattedMovies.filter((movie) =>
    favourites.includes(movie.id)
  );

  const noInput = normalizedQuery.length === 0;
  const noMatch = !noInput && filteredMovies.length === 0;

  const toggleFavourite = (id) => {
    setFavourites((current) =>
      current.includes(id)
        ? current.filter((favId) => favId !== id)
        : [...current, id]
    );
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <section className="movie-explorer-shell">
      <div className="movie-explorer">
        <header className="movie-header">
          <div>
            <h1 className="movie-heading">Movie Explorer</h1>
            <p className="movie-subtitle">
              Search, filter, and favorite movies. Designed for a single-page
              React component structure.
            </p>
          </div>
          <p className="movie-status">Local data &middot; React state ready</p>
        </header>

        <div className="movie-search-panel">
          <div className="movie-search-box">
            <SearchIcon />
            <input
              className="movie-search-input"
              type="text"
              placeholder='Search movies (e.g. "Interstellar", "Star")'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                className="movie-search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          <button type="button" className="movie-reset-btn" onClick={clearSearch}>
            <ResetIcon />
            <span>Reset</span>
          </button>
        </div>

        <div className="movie-toolbar">
          <p className="movie-results-text">
            {noInput
              ? 'Type a movie name to begin searching'
              : `${filteredMovies.length} results for "${query}"`}
          </p>

          <div className="movie-hints">
            <span className="movie-hint-pill">No input &rarr; show hint</span>
            <span className="movie-hint-pill">No match &rarr; show empty state</span>
          </div>
        </div>

        <div className="movie-content-grid">
          <section className="movie-column">
            <div className="movie-section-head">
              <h2>Matching Movies</h2>
              <span>Filtered from local movie data</span>
            </div>

            {noInput && (
              <p className="movie-empty-copy">
                Type in the search box to explore matching movies.
              </p>
            )}

            {noMatch && (
              <p className="movie-empty-copy">
                No movies found matching your search.
              </p>
            )}

            {!noInput && !noMatch && (
              <>
                <div className="movie-card-list">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isFavourite={favourites.includes(movie.id)}
                      onToggle={toggleFavourite}
                    />
                  ))}
                </div>
                <p className="movie-footnote">
                  When there are no matching results, replace this list with a
                  short "No movies found" message.
                </p>
              </>
            )}
          </section>

          <section className="movie-column movie-favourites-column">
            <div className="movie-section-head">
              <h2>Favorite Movies</h2>
              <span>Derived from favorite state</span>
            </div>

            {favouriteMovies.length === 0 ? (
              <p className="movie-empty-copy">
                You haven&apos;t added any favorites yet.
              </p>
            ) : (
              <>
                <div className="movie-favourite-list">
                  {favouriteMovies.map((movie) => (
                    <button
                      type="button"
                      key={movie.id}
                      className="movie-favourite-pill"
                      onClick={() => toggleFavourite(movie.id)}
                    >
                      <HeartIcon filled={false} />
                      <span>
                        {movie.title} ({movie.year})
                      </span>
                    </button>
                  ))}
                </div>

                <p className="movie-footnote">
                  If no movies are favorited, show: &quot;You haven&apos;t added any
                  favorites yet.&quot;
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

export default MovieExplorer;
