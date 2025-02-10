/** Project Card Component
 *
 * This component is used to display a project card.
 * @param {string} image - The image URL of the project.
 * @param {string} title - The title of the project.
 * @param {string} startDate - The start date of the project.
 * @param {string} deliveryDate - The finish date of the project.
 * @param {number} totalApartments - The total number of apartments in the project.
 * @param {boolean} isAvailable - The availability status of the project.
 * @returns {JSX.Element}
 */

import React from "react";
import "../styles/ProjectCard.css";
import { FaCalendarAlt, FaBuilding } from "react-icons/fa";
import config from "../config.json";
function ProjectCard({
  image,
  title,
  startDate,
  deliveryDate,
  totalApartments,
  isAvailable,
}) {
  const isCompleted = new Date(deliveryDate) < new Date();
  const statusText = isCompleted
    ? config.siteContent.projectsPage.projectCard.completedText
    : config.siteContent.projectsPage.projectCard.inProgressText;
  const statusClass = isCompleted ? "status-completed" : "status-in-progress";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <div className={`project-card ${isCompleted ? "completed" : "upcoming"}`}>
      <div className="project-image">
        <img src={image} alt={title} />
        {isAvailable && (
          <span className="availability-indicator">
            {config.siteContent.projectsPage.projectCard.isAvailable}
          </span>
        )}
        <span className={`project-status ${statusClass}`}>{statusText}</span>
      </div>
      <div className="project-details">
        <h3 className="project-title">{title}</h3>
        <div className="project-stats">
          <p className="date-info">
            <FaCalendarAlt />
            <span>
              <strong>
                {config.siteContent.projectsPage.projectCard.startDate}:
              </strong>{" "}
              {formatDate(startDate)}
            </span>
          </p>
          <p className="date-info">
            <FaCalendarAlt />
            <span>
              <strong>
                {config.siteContent.projectsPage.projectCard.deliveryDate}:
              </strong>{" "}
              {formatDate(deliveryDate)}
            </span>
          </p>
          <p className="total-apartments">
            <FaBuilding />
            <span>
              {totalApartments}{" "}
              {config.siteContent.projectsPage.projectCard.apartments}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
