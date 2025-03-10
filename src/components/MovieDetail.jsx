import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=7c874fb4&i=${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[40rem] text-center">
        <h1 className="text-2xl font-bold mb-3">{movie.Title}</h1>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-72 h-96 object-cover mx-auto rounded-lg"
        />
        <p className="text-gray-600 mt-3">{movie.Year}</p>
        <p className="text-gray-600">{movie.Genre}</p>
        <p className="text-sm text-gray-700 mt-2">{movie.Plot}</p>
        <p className="font-semibold mt-2">
          IMDB Rating:{" "}
          <span className="text-yellow-500">{movie.imdbRating}</span>
        </p>
        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
