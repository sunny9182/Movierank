import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import Footer from "../../components/Footer/Footer";
import Searchcontainer from "../../components/searchbar/searchbar";

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        if (query.trim() === "") {
            setSearchResults([]);
            return;
        }
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`
            );
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            setError("Failed to fetch search results");
            console.error("Error fetching search results:", error);
        }
    };

    const debouncedSearch = debounce(handleSearch, 300);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleSearchClick = () => {
        handleSearch(searchQuery);
    };

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch(
                    "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
                );
                const data = await response.json();
                setPopularMovies(data.results);
            } catch (error) {
                setError("Failed to fetch popular movies");
                console.error("Error fetching movies:", error);
            }
        };

        fetchPopularMovies();
    }, []);

    return (
        <>
            <div className="poster">
                {error && <p className="error">{error}</p>}

                {popularMovies.length > 0 ? (
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        interval={3000}
                        transitionTime={1000}
                        infiniteLoop={true}
                        showStatus={false}
                        showArrows={true}
                    >
                        {popularMovies.map((movie) => (
                            <Link key={movie.id} to={`/movie/${movie.id}`} className="carousel-link">
                                <div className="posterImage">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                                        alt={movie?.original_title}
                                    />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie?.original_title}</div>
                                    <div className="posterImage__runtime">
                                        {movie?.release_date}
                                        <span className="posterImage__rating">
                                            {movie?.vote_average} <i className="fas fa-star" />
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie?.overview}</div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                ) : (
                    <p>Loading movies...</p>
                )}

                <Searchcontainer searchQuery={searchQuery} onInputChange={handleInputChange} onSearchClick={handleSearchClick} />

                <MovieList searchResults={searchResults} />
                <Footer />
            </div>
        </>
    );
};

export default Home;
