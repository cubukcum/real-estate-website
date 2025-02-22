import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetailPage.css";
import axios from "axios";
import config from "../config.json";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  // Add this function to parse coordinates
  const getCoordinates = (addressString) => {
    const [lat, lng] = addressString
      .split(",")
      .map((coord) => parseFloat(coord));
    return [lat, lng];
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
        <div className="pdp-title-wrapper">
          <h1 className="pdp-title">{project.title}</h1>
          <div className="pdp-hero-meta">
            <span>
              <i className="fas fa-calendar"></i>{" "}
              {formatDate(project.deliverydate)}
            </span>
          </div>
        </div>
      </div>

      <div className="pdp-content-wrapper">
        <div className="pdp-main-image-container">
          {images.length > 0 && (
            <img
              src={images[0].url}
              alt={project.title}
              className="pdp-main-image"
            />
          )}
        </div>

        <div className="pdp-details">
          <div className="pdp-details-grid">
            <div>
              <p>
                <strong>
                  {config.siteContent.projectDetailPage.projectAddress}
                </strong>
              </p>
              <div className="map-container">
                <MapContainer
                  center={getCoordinates(project.address)}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={getCoordinates(project.address)} />
                </MapContainer>
              </div>
              <p>
                <a
                  href={`https://maps.google.com/?q=${getCoordinates(
                    project.address
                  ).join(",")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {config.siteContent.projectDetailPage.projectOpenInGoogleMaps}
                </a>
              </p>
            </div>

            <div className="project-info-section">
              <div>
                <p>
                  <strong>
                    {
                      config.siteContent.projectDetailPage
                        .projectTotalConstructionArea
                    }
                    :
                  </strong>{" "}
                  {project.totalconstructionarea}
                </p>
                <p>
                  <strong>
                    {
                      config.siteContent.projectDetailPage
                        .projectTotalApartments
                    }
                    :
                  </strong>{" "}
                  {project.totalapartments}
                </p>
                <p>
                  <strong>
                    {config.siteContent.projectDetailPage.projectRoomTypes}:
                  </strong>{" "}
                  {project.roomtype}
                </p>
              </div>
              <div>
                <p>
                  <strong>
                    {config.siteContent.projectDetailPage.projectStartDate}:
                  </strong>{" "}
                  {formatDate(project.startdate)}
                </p>
                <p>
                  <strong>
                    {config.siteContent.projectDetailPage.projectCompletionDate}
                    :
                  </strong>{" "}
                  {formatDate(project.deliverydate)}
                </p>
                <p>
                  <strong>Description:</strong>
                </p>
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pdp-gallery-section">
          <h2 className="pdp-gallery-title">
            {config.siteContent.projectDetailPage.projectGalleryTitle}
          </h2>
          <div className="pdp-gallery">
            {images.slice(1).map((image, index) => (
              <div key={image.id} className="pdp-gallery-item">
                <img src={image.url} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
