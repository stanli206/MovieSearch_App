import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState("");

  const API_KEY = process.env.REACT_APP_MOVIESEARCHAPI_KEY;  //"7c874fb4";

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}&type=${type}`
      );
      setMovies(response.data.Search || []);
      setTotalResults(response.data.totalResults || 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchMovies();
    }
  }, [page, type]);

  return (
    <div className="p-4 bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Movie Hub</h1>
      <div className="flex justify-end gap-10 mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded "
        >
          <option value="" className="text-black">All</option>
          <option value="movie" className="text-black">Movie</option>
          <option value="series" className="text-black">Series</option>
          <option value="episode" className="text-black">Episode</option>
        </select>
        <button
          onClick={searchMovies}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white text-black">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <div className="border-none shadow p-4 rounded">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-88 object-scale-down"
              />
              <h2 className="text-xl font-semibold">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
      {totalResults > 10 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-2 bg-blue-500 text-white rounded mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(totalResults / 10)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;


