import React, { useState, useEffect } from "react";
import "./Rating.css";

const StarRating = ({ onRate, resetRating }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (resetRating) {
            setRating(0);
            setHoverRating(0);
        }
    }, [resetRating]);

    const handleHover = (e, index) => {
        const { width, left } = e.currentTarget.getBoundingClientRect();
        const hoverValue = index + (e.clientX - left) / width;
        setHoverRating(hoverValue.toFixed(1));
    };

    const handleClick = () => {
        setRating(hoverRating);
        onRate(Number(hoverRating));
    };

    return (
        <div className="star-rating">
            <div className="stars">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="star"
                        onMouseMove={(e) => handleHover(e, index)}
                        onClick={handleClick}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                        <div className="stars">
                        <i
                            className="fas fa-star"
                            style={{
                                color:
                                    hoverRating > index
                                        ? hoverRating - index < 1
                                            ? `rgba(255, 215, 0, ${hoverRating - index})`
                                            : "red"
                                        : "#ccc",
                            }}
                        />
                        </div>
                    </div>
                ))}
            </div>
            <div className="rating-text">You've Rated: {hoverRating || rating} / 5</div>
        </div>
    );
};

export default StarRating;
