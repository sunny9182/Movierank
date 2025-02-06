import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import StarRating from "../../starrating/Rating.js";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [movieVideo, setMovieVideo] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [resetRating, setResetRating] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getData();
        getVideo();
        window.scrollTo(0, 0);
    }, [id]);

    const getVideo = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=237d88730a8a35f6d677f33e81b36566`)
            .then((res) => res.json())
            .then((data) => {
                const video = data.results.find((video) => video.key);
                setMovieVideo(video ? `https://www.youtube.com/embed/${video.key}` : null);
            })
            .catch((error) => console.error("Error fetching video:", error));
    };

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then((res) => res.json())
            .then((data) => setMovie(data));
    };

    const handleReviewSubmit = () => {
        if (!reviewText.trim()) {
            alert("Please write a review before submitting!");
            return;
        }

        const reviewData = {
            movieId: id,
            review: reviewText,
            rating: rating,
        };

        console.log("Review Submitted:", reviewData);

        setReviewText("");
        setRating(0);
        setResetRating(true);
        setTimeout(() => setResetRating(false), 100);
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                {movieVideo ? (
                    <iframe
                        className="movie__backdrop"
                        src={`${movieVideo}?autoplay=1`}
                        title="Movie Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="no-trailer">
                        <p>Film Footage Unavailable</p>
                    </div>
                )}
            </div>

            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}
                            alt="Movie Poster"
                        />
                    </div>
                </div>

                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie_details">
                            <div className="movie__name">
                                {currentMovieDetail ? currentMovieDetail.original_title.toUpperCase() : ""}
                            </div>

                            <div className="movie_info">
                                <div className="movie__tagline">
                                    Tag Line: {currentMovieDetail ? currentMovieDetail.tagline : ""}
                                </div>
                                <div className="movie__rating">
                                    RATED: {currentMovieDetail ? currentMovieDetail.vote_average : ""}
                                    <i className="fas fa-star" />
                                    <span className="movie__voteCount">
                                        {currentMovieDetail ? `(${currentMovieDetail.vote_count}) Reviews` : ""}
                                    </span>
                                </div>
                                <div className="movie__runtime">
                                    DURATION: {currentMovieDetail ? `${currentMovieDetail.runtime} min` : ""}
                                </div>
                                <div className="movie__releaseDate">
                                    {currentMovieDetail ? `RELEASE DATE: ${currentMovieDetail.release_date}` : ""}
                                </div>
                            </div>
                        </div>

                        <div className="movie__genres">
                            {currentMovieDetail?.genres?.map((genre) => (
                                <span className="movie__genre" key={genre.id}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">SYNOPSIS</div>
                        <div className="Overview">
                            {currentMovieDetail ? currentMovieDetail.overview : ""}
                        </div>
                    </div>

                    <div className="review_star">
                        <StarRating onRate={setRating} resetRating={resetRating} />
                    </div>

                    <div className="review_box">
                        <label>
                            <div className="review_heading"> Write Your Review</div>
                            <textarea
                                placeholder="Write your review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                        </label>
                        <button className="button_submit" onClick={handleReviewSubmit}>
                            SAVE REVIEW
                        </button>
                    </div>
                </div>
            </div>

            <div className="movie__links">
                <div className="movie__heading">FOR MORE INFORMATION</div>
                <div className="movie__buttons">
                    {currentMovieDetail?.homepage && (
                        <a 
                            href={currentMovieDetail.homepage} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ textDecoration: "none" }}
                        >
                            <p>
                                <span className="movie__homeButton movie__Button white-button">
                                    OFFICIAL WEBSITE<i className="newTab fas fa-external-link-alt"></i>
                                </span>
                            </p>
                        </a>
                    )}

                    {currentMovieDetail?.imdb_id && (
                        <a 
                            href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ textDecoration: "none" }}
                        >
                            <p>
                                <span className="movie__imdbButton movie__Button">
                                    IMDB RATING<i className="newTab fas fa-external-link-alt"></i>
                                </span>
                            </p>
                        </a>
                    )}
                </div>
            </div>

            <div className="production">
                <div className="production_by">PRODUCED BY</div>
                <div className="movie__production">
                    {currentMovieDetail?.production_companies?.map((company) => (
                        company.logo_path && (
                            <span className="productionCompanyImage" key={company.id}>
                                <img
                                    className="movie__productionComapany"
                                    src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                    alt={company.name}
                                />
                                <span>{company.name}</span>
                            </span>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Movie;
