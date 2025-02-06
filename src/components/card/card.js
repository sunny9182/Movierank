import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const { poster_path, original_title, release_date, vote_average, overview, id } = movie || {};

    const fallbackImage = "path/to/fallback-image.jpg";

    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/movie/${id}`} style={{ textDecoration: "none", color: "white" }}>
                    <div className="cards">
                        <img
                            className="cards__img"
                            src={`https://image.tmdb.org/t/p/original${poster_path || ""}`}
                            alt={original_title || "Movie Poster"}
                            onError={(e) => e.target.src = fallbackImage}
                        />
                        <div className="cards__overlay">
                            <div className="card__title">{original_title || ""}</div>
                            <div className="card__runtime">
                                {release_date}
                                <span className="card__rating">
                                    {vote_average}
                                    <i className="fas fa-star" />
                                </span>
                            </div>
                            <div className="card__description">
                                {overview ? `${overview.slice(0, 118)}...` : ""}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;
