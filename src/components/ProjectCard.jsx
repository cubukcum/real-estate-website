/** Project Card Component
 *
 * This component is used to display a project card.
 * @param {string} image - The image URL of the project.
 * @param {string} title - The title of the project.
 * @param {string} builtDate - The built date of the project.
 * @param {number} totalApartments - The total number of apartments in the project.
 * @param {boolean} isAvailable - The availability status of the project.
 * @returns {JSX.Element}
 */

import React from "react";
import "../styles/ProjectCard.css";

function ProjectCard({
  image,
  title,
  builtDate,
  totalApartments,
  isAvailable,
}) {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} />
        {isAvailable && (
          <span className="availability-indicator">Available</span>
        )}
      </div>
      <div className="project-details">
        <h3 className="project-title">{title}</h3>
        <p className="built-date">Built Date: {builtDate}</p>
        <p className="total-apartments">Apartments: {totalApartments}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
