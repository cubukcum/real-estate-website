import React from "react";
import TopBanner from "../components/TopBanner";
import FeaturesSection from "../components/FeaturesSection";
import AchievementsSection from "../components/AchievementsSection";
import ProjectsSlider from "../components/ProjectsSlider";

const HomePage = () => {
  return (
    <div className="home-page">
      <TopBanner />
      <ProjectsSlider />
      <FeaturesSection />
      <AchievementsSection />
    </div>
  );
};

export default HomePage;
