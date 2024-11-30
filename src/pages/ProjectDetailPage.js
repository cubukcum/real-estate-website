import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = {
    id,
    name: "Project A",
    location: "City Center",
    description: "Luxury apartments in the heart of the city.",
    apartments: [
      { id: 1, number: "101", isAvailable: true },
      { id: 2, number: "102", isAvailable: false },
    ],
  };

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <h2>Available Apartments</h2>
      <ul>
        {project.apartments
          .filter((apartment) => apartment.isAvailable)
          .map((apartment) => (
            <li key={apartment.id}>
              <a href={`/apartments/${apartment.id}`}>
                Apartment {apartment.number}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProjectDetailPage;
