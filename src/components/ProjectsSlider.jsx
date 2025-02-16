import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import sampleImage1 from "../assets/sample-project1.jpeg";
import "../styles/ProjectsSlider.css";
const ProjectsSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => setProjects(response.data.slice(0, 3)))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <section className="bg-light py-5">
      <div className="container text-center">
        <h2 className="mb-4 position-relative d-inline-block">
          Featured Projects
        </h2>
        <Carousel
          interval={5000}
          className="projects-carousel"
          indicators={true}
          controls={true}
          pause="hover"
        >
          {projects.map((project) => (
            <Carousel.Item key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="text-decoration-none"
              >
                <div className="position-relative">
                  <img
                    src={project.mainImage || sampleImage1}
                    alt={project.title}
                    className="d-block w-100 project-image"
                    style={{ height: "550px", objectFit: "cover" }}
                  />
                  <Carousel.Caption className="text-start project-caption">
                    <h3
                      className="text-white"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-white"
                      style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
                    >
                      {project.description?.substring(0, 120)}
                      {project.description?.length > 120 ? "..." : ""}
                    </p>
                  </Carousel.Caption>
                </div>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ProjectsSlider;
