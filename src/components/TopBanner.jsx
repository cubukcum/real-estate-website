import React from "react";
import "../styles/TopBanner.css";

function TopBanner() {
  return (
    <div className="top-banner">
      <div className="top-banner-content">
        <h1 className="banner-title">Welcome to [Your Company Name]</h1>
        <p className="banner-subtitle">
          Building Dreams, Brick by Brick. Discover Your Perfect Home.
        </p>
        <div className="banner-buttons">
          <button className="btn explore-btn">Explore Projects</button>
          <button className="btn contact-btn">Contact Us</button>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
