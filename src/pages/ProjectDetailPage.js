import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetailPage.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling
import mainImage from "../assets/project-main-image.jpeg";
import projectImage1 from "../assets/project-image1.jpeg";
import projectImage2 from "../assets/project-image2.jpeg";
import projectImage3 from "../assets/project-image3.jpeg";
import background1 from "../assets/about-page/background1.jpg";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      const projectData = {
        id: id,
        title: "Sunrise Residency",
        address: "123 Main Street, Downtown City",
        googleMapsLink: "https://goo.gl/maps/example",
        constructionArea: "10,000 sq ft",
        totalApartments: 50,
        roomNumbers: "1BHK, 2BHK, 3BHK",
        startDate: "2022-01-01",
        deliveryDate: "2024-12-31",
        description:
          "Sunrise Residency is a modern apartment complex offering luxurious living with a host of amenities, including a swimming pool, gym, and 24/7 security.",
        mainImage: mainImage,
        galleryImages: [projectImage1, projectImage2, projectImage3],
      };
      setProject(projectData);
    };

    fetchProjectData();
  }, [id]);

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (
    <div className="project-detail-page container">
      <h1 className="project-title">{project.title}</h1>

      {/* Main Image */}
      <div className="main-image-container mb-4">
        <img
          src={project.mainImage}
          alt={project.title}
          className="main-image img-fluid rounded"
        />
      </div>

      {/* Project Details */}
      <div className="row project-details mb-4">
        <div className="col-md-6">
          <p>
            <strong>Address:</strong>{" "}
            <a
              href={project.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.address}
            </a>
          </p>
          <p>
            <strong>Total Construction Area:</strong> {project.constructionArea}
          </p>
          <p>
            <strong>Total Apartments:</strong> {project.totalApartments}
          </p>
          <p>
            <strong>Room Types:</strong> {project.roomNumbers}
          </p>
        </div>
        <div className="col-md-6">
          <p>
            <strong>Start Date:</strong> {project.startDate}
          </p>
          <p>
            <strong>Delivery Date:</strong> {project.deliveryDate}
          </p>
          <p>
            <strong>Description:</strong>
          </p>
          <p>{project.description}</p>
        </div>
      </div>

      {/* Image Gallery */}
      <h2>Gallery</h2>
      <div className="row project-gallery">
        {project.galleryImages.map((image, index) => (
          <div key={index} className="col-md-4 mb-3">
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
