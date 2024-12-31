import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetailPage.css";
import background1 from "../assets/about-page/background1.jpg";
import axios from "axios";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${id}`)
      .then((response) => setProject(response.data))
      .catch((error) =>
        console.error("Error fetching project details:", error)
      );

    axios
      .get(`${process.env.REACT_APP_API_URL}/projects/${id}/images`)
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, [id]);

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (
    <div className="pdp-container">
      <div className="pdp-hero">
        <h1 className="pdp-title">{project.title}</h1>
      </div>

      {/* Main Image */}
      <div className="pdp-main-image-container">
        {images.length > 0 && (
          <img
            src={images[0].url}
            alt={project.title}
            className="pdp-main-image rounded"
          />
        )}
      </div>

      {/* Project Details */}
      <div className="container">
        <div className="pdp-details">
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Address:</strong>{" "}
                <a
                  href={"https://goo.gl/maps/example"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.address}
                </a>
              </p>
              <p>
                <strong>Total Construction Area:</strong>{" "}
                {project.totalconstructionarea}
              </p>
              <p>
                <strong>Total Apartments:</strong> {project.totalapartments}
              </p>
              <p>
                <strong>Room Types:</strong> {project.roomtype}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Start Date:</strong> {formatDate(project.startdate)}
              </p>
              <p>
                <strong>Delivery Date:</strong> {formatDate(project.deliverydate)}
              </p>
              <p>
                <strong>Description:</strong>
              </p>
              <p>{project.description}</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <h2 className="pdp-gallery-title">Project Gallery</h2>
        <div className="row pdp-gallery">
          {images.slice(1).map((image, index) => (
            <div key={image.id} className="col-md-4">
              <img
                src={image.url}
                alt={`Gallery ${index + 1}`}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
