import React, { useEffect, useState } from "react";
import "../styles/TopBanner.css";

function TopBanner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`top-banner ${isLoaded ? 'loaded' : ''}`}>
      <div className="top-banner-content">
        <h1 className="banner-title">Welcome to [Your Company Name]</h1>
        <p className="banner-subtitle">
          Building Dreams, Brick by Brick. Discover Your Perfect Home.
        </p>
        <div className="banner-buttons">
          <button className="btn explore-btn" onClick={() => window.location.href = '/projects'}>Explore Projects</button>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
