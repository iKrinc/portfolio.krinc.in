import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./header.scss";

const Header = ({ showNameInHeader }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // New state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      // New resize handler
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize); // Clean up resize listener
    };
  }, []);

  const isProjectDetailPage = location.pathname.startsWith("/project/");

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      {" "}
      {/* Modified line */}
      <div className="header-logo">
        {isProjectDetailPage ? (
          <Link to="/" className="home-icon">
            <i className="fas fa-home"></i>
          </Link>
        ) : (
          <h1 style={{ opacity: showNameInHeader ? 1 : 0 }}>
            {"Srinivas Krishna S K"}
          </h1>
        )}
      </div>
      {!isProjectDetailPage && (
        <nav className="header-nav">
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
