import React from "react";
import "../styles/ProjectsPage.css";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { useEffect, useState } from "react";
import sampleImage1 from "../assets/sample-project1.jpeg";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);


  return (
    <div className="projects-container">
      <h2 className="projects-title">Featured Projects</h2>
      <div className="project-list">
        {projects?.map((project, index) => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="project-link"
          >
            <ProjectCard
              key={index}
              image={sampleImage1}
              title={project.title}
              startDate={project.startdate}
              deliveryDate={project.deliverydate}
              totalApartments={project.totalapartments}
              isAvailable={project.availableforsale}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
