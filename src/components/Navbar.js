import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../styles/Navbar.css";
import config from "../config.json";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      const nav = document.querySelector(".nav");
      if (nav && !nav.contains(event.target)) {
        setIsNavExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsNavExpanded(false);
  };

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/" className="site-title">
        {config.companyInfo.name}
      </Link>
      <button
        className="hamburger"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={isNavExpanded ? "expanded" : ""}>
        <CustomLink to="/" onClick={handleLinkClick}>
          {config.siteContent.navbar.home}
        </CustomLink>
        <CustomLink to="/about" onClick={handleLinkClick}>
          {config.siteContent.navbar.about}
        </CustomLink>
        <CustomLink to="/projects" onClick={handleLinkClick}>
          {config.siteContent.navbar.projects}
        </CustomLink>
        <CustomLink to="/contact" onClick={handleLinkClick}>
          {config.siteContent.navbar.contact}
        </CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
