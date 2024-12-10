import React from "react";
import "../styles/ProjectsPage.css";
import ProjectCard from "../components/ProjectCard";
import sampleImage1 from "../assets/sample-project1.jpeg";
import sampleImage2 from "../assets/sample-project2.jpeg";

const sampleProjects = [
  {
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
    image: sampleImage2,
    title: "Urban Heights",
    builtDate: "2021",
    totalApartments: 100,
    isAvailable: false,
  },
  {
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
    image: sampleImage2,
    title: "Urban Heights",
    builtDate: "2021",
    totalApartments: 100,
    isAvailable: false,
  },
  {
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
    image: sampleImage2,
    title: "Urban Heights",
    builtDate: "2021",
    totalApartments: 100,
    isAvailable: false,
  },
  {
    image: sampleImage1,
    title: "Sunrise Residency",
    builtDate: "2023",
    totalApartments: 50,
    isAvailable: true,
  },
  {
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
          <ProjectCard
            key={index}
            image={project.image}
            title={project.title}
            builtDate={project.builtDate}
            totalApartments={project.totalApartments}
            isAvailable={project.isAvailable}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
