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
  console.log(projects);

  return (
    <div>
      <h2>Our Projects</h2>
      <div className="project-list">
        {projects?.map((project, index) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <ProjectCard
              key={index}
              image={sampleImage1}
              title={project.title}
              builtDate={project.startdate}
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
