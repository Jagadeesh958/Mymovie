import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {

  const [theme, setTheme] = useState("dark");

  const [searchterm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  const [trending, setTrending] = useState([]);

  const [popular, setPopular] = useState([]);

  const [topRated, setTopRated] = useState([]);

  const [tvShows, setTvShows] = useState([]);

  const API_KEY =  "0fd64f9ef765756a08f79ef264d54902";

  /* SEARCH INPUT */

  const handleSearch = (event) => {

    setSearchTerm(event.target.value);

  };

  /* THEME TOGGLE */

  const toggleTheme = () => {

    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );

  };

  /* FETCH DATA */

  useEffect(() => {

    /* TRENDING */

    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) =>
        setTrending(data.results || [])
      );

    /* POPULAR */

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) =>
        setPopular(data.results || [])
      );

    /* TOP RATED */

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) =>
        setTopRated(data.results || [])
      );

    /* TV SHOWS */

    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) =>
        setTvShows(data.results || [])
      );

  }, []);

  /* SEARCH MOVIES */

  useEffect(() => {

    if (searchterm.length > 0) {

      setLoading(true);

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchterm}`
      )
        .then((res) => res.json())

        .then((data) => {

          setMovies(data.results || []);

          setLoading(false);

        })

        .catch((error) => {

          console.log(error);

          setLoading(false);

        });

    } else {

      setMovies([]);

    }

  }, [searchterm]);

  /* CARD COMPONENT */

  const renderCards = (data) => {

    return data.map((movie) => (

      <div className="movie-card" key={movie.id}>

       <img
  src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image"
  }

  alt={movie.title || movie.name}

  onError={(e)=>{
    e.target.src =
    "https://via.placeholder.com/500x750?text=No+Image"
  }}
/>

        <div className="movie-content">

          <h3>
            {movie.title || movie.name}
          </h3>

          <p>
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>

          <span>
            {movie.release_date || movie.first_air_date}
          </span>

        </div>

      </div>

    ));

  };

  return (

    <div className={`App ${theme}`}>

      {/* HEADER */}

      <div className="header">

        <button
          className="btn"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </div>

      {/* HERO SECTION */}

      <div className="hero-section">

        <div className="hero-overlay">

          <h1 className="hero-title">
             CINEMA WORLD
          </h1>

          <p className="hero-subtitle">
            Explore Movies In Premium Experience 🍿
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search your favorite movie..."
          onChange={handleSearch}
          value={searchterm}
        />

      </div>

      <main>

        {/* LOADING */}

        {loading && (

          <div className="loading">

            <p></p>

          </div>

        )}

        {/* SEARCH RESULTS */}

        {!loading && movies.length > 0 && (

          <div className="movies-section">

            <h2 className="section-title">
              Search Results
            </h2>

            <div className="movies-grid">

              {renderCards(movies)}

            </div>

          </div>

        )}

        {/* TRENDING */}

        {!searchterm && trending.length > 0 && (

          <div className="movies-section">

            <h2 className="section-title">
              Trending Movies
            </h2>

            <div className="movies-grid">

              {renderCards(trending)}

            </div>

          </div>

        )}

        {/* POPULAR */}

        {!searchterm && popular.length > 0 && (

          <div className="movies-section">

            <h2 className="section-title">
              Popular Movies
            </h2>

            <div className="movies-grid">

              {renderCards(popular)}

            </div>

          </div>

        )}

        {/* TOP RATED */}

        {!searchterm && topRated.length > 0 && (

          <div className="movies-section">

            <h2 className="section-title">
              Top Rated Movies
            </h2>

            <div className="movies-grid">

              {renderCards(topRated)}

            </div>

          </div>

        )}

        {/* TV SHOWS */}

        {!searchterm && tvShows.length > 0 && (

          <div className="movies-section">

            <h2 className="section-title">
              Popular TV Shows
            </h2>

            <div className="movies-grid">

              {renderCards(tvShows)}

            </div>

          </div>

        )}

        {/* EMPTY */}

        {!searchterm && (

          <p className="empty-message">
                  

          </p>

        )}

      </main>

    </div>

  );

};

export default App;