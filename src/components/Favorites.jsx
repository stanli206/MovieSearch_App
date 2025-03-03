import React from "react";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="p-4 bg-black">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-64 object-fill"
            />
            <h2 className="text-xl font-semibold">{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
