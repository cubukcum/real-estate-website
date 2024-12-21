import React from "react";
import TopBanner from "../components/TopBanner";
import FeaturesSection from "../components/FeaturesSection";
import AchievementsSection from "../components/AchievementsSection";

const HomePage = () => {
  return (
    <div className="home-page">
      <TopBanner />
      <FeaturesSection />
      <AchievementsSection />
    </div>
  );
};

export default HomePage;
