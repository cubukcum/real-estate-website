import React from "react";
import "../styles/FeaturesSection.css";
import { FaHome, FaMapMarkerAlt, FaHandshake, FaLeaf } from "react-icons/fa";
import config from "../config.json";
const FeaturesSection = () => {
  const features = [
    {
      icon: <FaHome />,
      title: config.siteContent.homePage.featuresSection.feature1,
      description:
        config.siteContent.homePage.featuresSection.feature1Description,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: config.siteContent.homePage.featuresSection.feature2,
      description:
        config.siteContent.homePage.featuresSection.feature2Description,
    },
    {
      icon: <FaHandshake />,
      title: config.siteContent.homePage.featuresSection.feature3,
      description:
        config.siteContent.homePage.featuresSection.feature3Description,
    },
    {
      icon: <FaLeaf />,
      title: config.siteContent.homePage.featuresSection.feature4,
      description:
        config.siteContent.homePage.featuresSection.feature4Description,
    },
  ];

  return (
    <div className="features-section">
      <h2 className="features-section-title">
        {config.siteContent.homePage.featuresSection.whyChooseUsTitle}
      </h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
