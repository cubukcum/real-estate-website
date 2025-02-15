import React from "react";
import "../styles/AchievementsSection.css";
import config from "../config.json";
const AchievementsSection = () => {
  const stats = [
    {
      number: "50+",
      label: config.siteContent.homePage.achievementsSection.label1,
    },
    {
      number: "2000+",
      label: config.siteContent.homePage.achievementsSection.label2,
    },
    {
      number: "500+",
      label: config.siteContent.homePage.achievementsSection.label3,
    },
    {
      number: "10+",
      label: config.siteContent.homePage.achievementsSection.label4,
    },
  ];

  return (
    <div className="achievements-section">
      <h2 className="achievements-section-title">
        {config.siteContent.homePage.achievementsSection.title}
      </h2>
      <div className="achievements-list">
        {stats.map((stat, index) => (
          <div key={index} className="achievement-card">
            <h3 className="achievement-number">{stat.number}</h3>
            <p className="achievement-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
