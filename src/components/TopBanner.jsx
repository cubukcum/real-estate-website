import React, { useEffect, useState } from "react";
import "../styles/TopBanner.css";
import config from "../config.json";
function TopBanner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`top-banner ${isLoaded ? 'loaded' : ''}`}>
      <div className="top-banner-content">
        <h1 className="banner-title">{config.siteContent.homePage.topBanner.title} {config.companyInfo.name}</h1>
        <p className="banner-subtitle">
          {config.siteContent.homePage.topBanner.subtitle}
        </p>
        <div className="banner-buttons">
          <button className="btn explore-btn" onClick={() => window.location.href = '/projects'}>{config.siteContent.homePage.topBanner.buttonText}</button>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
