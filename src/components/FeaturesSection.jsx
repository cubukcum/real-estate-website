import React from "react";
import "../styles/FeaturesSection.css";
import { FaHome, FaMapMarkerAlt, FaHandshake, FaLeaf } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaHome />,
      title: "High-Quality Construction",
      description:
        "We build homes to last with the finest materials and modern designs.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Prime Locations",
      description:
        "Our projects are strategically located for convenience and accessibility.",
    },
    {
      icon: <FaHandshake />,
      title: "Transparent Dealings",
      description: "We ensure honesty and clarity in all our transactions.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly Designs",
      description: "Our designs are sustainable and environmentally conscious.",
    },
  ];

  return (
    <div className="features-section">
      <h2 className="features-section-title">Why Choose Us</h2>
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
