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
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${type || "popular"}?api_key=237d88730a8a35f6d677f33e81b36566&language=en-US`
                );
                const data = await response.json();
                setMovieList(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
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
                ) : (
                    movieList.map((movie) => <Cards key={movie.id} movie={movie} />)
                )}
            </div>
        </div>
    );
};

export default MovieList;
