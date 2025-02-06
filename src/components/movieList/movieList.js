import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "../card/card"; 
import "./movieList.css"; 

const MovieList = () => {
    const { type } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                console.log("Fetching movies of type:", type); // Log the type being fetched
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${type||"popular"}?api_key=237d88730a8a35f6d677f33e81b36566&language=en-US`
                );

                // Check if the response is ok (status in the range 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); // Log the entire response

                // Check if data.results is defined
                if (data && data.results) {
                    setMovieList(data.results);
                } else {
                    console.error("No results found in the response");
                    setMovieList([]); // Set to empty array if no results
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMovieList([]); // Set to empty array on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [type]);

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type || "TRENDING NOW").toUpperCase()}</h2>
            <div className="list__cards">
                {isLoading ? (
                    <p>Loading...</p>
                ) : movieList.length === 0 ? (
                    <p>No movies found.</p>
                ) : (
                    movieList.map((movie) => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default MovieList;
