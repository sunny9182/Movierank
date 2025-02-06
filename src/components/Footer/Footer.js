import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li>
                            <Link to="/movies/now_playing" style={{ textDecoration: "none" }}>
                                <span>TRENDING</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies/popular" style={{ textDecoration: "none" }}>
                                <span>POPULAR</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
                                <span>TOP-RATED</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
                                <span>UPCOMING</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

             
                <div className="footer-section">
                    <h4>Subscribe to My Newsletter</h4>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

            
                <div className="footer-section">
                    <h4>Contact Me</h4>
                    <div className="contact">
                        <p>saicharansalugari9@gmail.com</p>
                        <p>+1 551 554 1618</p>
                    </div>
                </div>
            </div>

            
            <div className="footer-bottom">
                <div className="copyright">
                    &copy; {new Date().getFullYear()} MovieRank. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
