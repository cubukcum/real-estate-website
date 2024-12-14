import React from "react";
import "../styles/ProjectsPage.css";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import sampleImage1 from "../assets/sample-project1.jpeg";
import sampleImage2 from "../assets/sample-project2.jpeg";

const sampleProjects = [
  {
    id: 1,
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
    id: 2,
    image: sampleImage2,
    title: "Urban Heights",
    builtDate: "2021",
    totalApartments: 100,
    isAvailable: false,
  },
  {
    id: 3,
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
    id: 4,
    image: sampleImage2,
    title: "Urban Heights",
    builtDate: "2021",
    totalApartments: 100,
    isAvailable: false,
  },
  {
    id: 5,
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
    id: 6,
    image: sampleImage2,
    title: "Urban Heights",
    builtDate: "2021",
    totalApartments: 100,
    isAvailable: false,
  },
  {
    id: 7,
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
    id: 8,
    image: sampleImage2,
    title: "Urban Heights",
    builtDate: "2021",
    totalApartments: 100,
    isAvailable: false,
  },
];

const ProjectsPage = () => {
  return (
    <div>
      <h2>Our Projects</h2>
      <div className="project-list">
        {sampleProjects.map((project, index) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <ProjectCard
              key={index}
              image={project.image}
              title={project.title}
              builtDate={project.builtDate}
              totalApartments={project.totalApartments}
              isAvailable={project.isAvailable}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
