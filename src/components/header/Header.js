import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import MOVIERANK from './movierank.jpg'; 

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                    <img className="header__icon" src={MOVIERANK} alt="MovieRank Logo" />
                </Link>
            </div>
            <div className="headerRight">
                {['TRENDING', 'POPULAR', 'TOP-RATED', 'UPCOMING'].map((text, index) => (
                    <Link key={index} to={`/movies/${text.toLowerCase().replace(/ /g, "_")}`} style={{ textDecoration: "none" }}>
                        <span>{text}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Header;
