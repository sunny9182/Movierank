import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./searchbar.css";

const Searchcontainer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const debounce = useCallback((func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }, []);

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`
            );
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError("Failed to fetch search results. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedSearch = useCallback(debounce(handleInputChange, 300), [debounce]);

    const handleSearchClick = () => {
        debouncedSearch({ target: { value: searchQuery } });
    };

    return (
        <div className="search-wrapper">
            <div className="search-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            debouncedSearch(e);
                        }}
                        className="search-input"
                    />
                    <button onClick={handleSearchClick} className="search-button">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>

                {isLoading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}
                {!isLoading && searchResults.length === 0 && searchQuery.trim() !== "" && (
                    <div className="no-results">No results found.</div>
                )}

                {searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map((movie) => (
                            <div key={movie.id} className="movie-result">
                                <Link to={`/movie/${movie.id}`} className="movie-link">
                                    {movie.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Searchcontainer;
