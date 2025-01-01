import React from "react";
import "../styles/AchievementsSection.css";

const AchievementsSection = () => {
  const stats = [
    { number: "50+", label: "Completed Projects" },
    { number: "2000+", label: "Apartments Delivered" },
    { number: "500+", label: "Families Housed" },
    { number: "10+", label: "Awards Won" },
  ];

  return (
    <div className="achievements-section">
      <h2 className="achievements-section-title">Our Achievements</h2>
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
