import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import sampleImage1 from '../assets/sample-project1.jpeg';

const ProjectsSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => setProjects(response.data.slice(0, 3))) // Get only first 3 projects
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="projects-slider">
      <h2 className="text-center mb-4">Featured Projects</h2>
      <Carousel 
        interval={5000} 
        className="custom-carousel"
        indicators={true}
        controls={true}
      >
        {projects.map((project) => (
          <Carousel.Item key={project.id}>
            <Link to={`/projects/${project.id}`} className="text-decoration-none">
              <ProjectCard
                image={sampleImage1}
                title={project.title}
                startDate={project.startdate}
                deliveryDate={project.deliverydate}
                totalApartments={project.totalapartments}
                isAvailable={project.availableforsale}
              />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProjectsSlider; 