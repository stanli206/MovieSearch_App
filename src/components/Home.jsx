import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState("");

  const API_KEY = "dcc773e9";

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}&type=${type}`
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [featuredMovies, setFeaturedMovies] = useState([]);
//   const [type, setType] = useState("");

//   const API_KEY = "dcc773e9";

//   // Fetch movies for featured section
//   const fetchFeaturedMovies = async () => {
//     try {
//       const response = await axios.get(
//         `http://www.omdbapi.com/?apikey=${API_KEY}&s=batman&type=movie`
//       );
//       setFeaturedMovies(response.data.Search || []);
//     } catch (error) {
//       console.error("Error fetching featured movies:", error);
//     }
//   };

//   const searchMovies = async () => {
//     try {
//       const response = await axios.get(
//         `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=${type}`
//       );
//       setMovies(response.data.Search || []);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFeaturedMovies();
//   }, []);

//   return (
//     <div className="p-4 bg-black text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Movie Hub</h1>

//       {/* Search Section */}
//       <div className="flex justify-center gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Search for movies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border rounded text-black"
//         />
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="p-2 border rounded text-black"
//         >
//           <option value="">All</option>
//           <option value="movie">Movie</option>
//           <option value="series">Series</option>
//           <option value="episode">Episode</option>
//         </select>
//         <button
//           onClick={searchMovies}
//           className="p-2 bg-red-600 text-white rounded"
//         >
//           Search
//         </button>
//       </div>

//       {/* Featured Movies Section */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-2">Trending Now</h2>
//         <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
//           {featuredMovies.map((movie) => (
//             <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="flex-none">
//               <div className="relative w-48">
//                 <img
//                   src={movie.Poster}
//                   alt={movie.Title}
//                   className="w-full h-72 object-cover rounded-lg transition-transform transform hover:scale-105"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-sm">
//                   {movie.Title}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Searched Movies Section */}
//       {movies.length > 0 && (
//         <div>
//           <h2 className="text-2xl font-bold mb-2">Search Results</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {movies.map((movie) => (
//               <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
//                 <div className="relative">
//                   <img
//                     src={movie.Poster}
//                     alt={movie.Title}
//                     className="w-full h-72 object-cover rounded-lg transition-transform transform hover:scale-105"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-sm">
//                     {movie.Title}
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
