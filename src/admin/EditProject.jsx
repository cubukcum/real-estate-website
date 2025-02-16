import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditProject.css";
import ImageUpload from "../components/ImageUpload";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [project, setProject] = useState({
    title: "",
    address: "",
    totalconstructionarea: "",
    totalapartments: "",
    roomtype: "",
    startdate: "",
    deliverydate: "",
    availableforsale: false,
    description: "",
  });
  const [projectImages, setProjectImages] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const fetchProjectAndImages = async () => {
      try {
        const projectResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/${id}`
        );
        const projectData = {
          ...projectResponse.data,
          totalconstructionarea: projectResponse.data.totalconstructionarea,
          totalapartments: projectResponse.data.totalapartments,
          roomtype: projectResponse.data.roomtype,
          startdate: projectResponse.data.startdate.split("T")[0],
          deliverydate: projectResponse.data.deliverydate.split("T")[0],
          availableforsale: projectResponse.data.availableforsale,
        };

        // Set the selected position if address contains coordinates
        if (projectData.address) {
          const [lat, lng] = projectData.address.split(",").map(Number);
          if (!isNaN(lat) && !isNaN(lng)) {
            setSelectedPosition([lat, lng]);
          }
        }

        setProject(projectData);

        const imagesResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/${id}/images`
        );
        setProjectImages(imagesResponse.data);
      } catch (error) {
        setError("Failed to fetch project details");
        console.error("Error:", error);
      }
    };

    fetchProjectAndImages();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedProject = {
        ...project,
        totalConstructionArea: project.totalconstructionarea,
        totalApartments: project.totalapartments,
        roomType: project.roomtype,
        startDate: project.startdate,
        deliveryDate: project.deliverydate,
        availableForSale: project.availableforsale,
        images: projectImages,
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/edit-project/${id}`,
        transformedProject
      );
      setSuccess("Project updated successfully");
      setTimeout(() => {
        navigate("/admin/manage-projects");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update project");
      console.error("Error:", error);
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);

        // Store coordinates as a comma-separated string
        setProject((prev) => ({
          ...prev,
          address: `${lat},${lng}`,
        }));
      },
    });
    return null;
  }

  return (
    <Container className="edit-project-container">
      <h2 className="edit-project-title">Edit Project</h2>
      {error && (
        <Alert
          variant="danger"
          className="edit-project-alert edit-project-error"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          variant="success"
          className="edit-project-alert edit-project-success"
        >
          {success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">Title</Form.Label>
          <Form.Control
            className="edit-project-input"
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">Address</Form.Label>
          <div style={{ height: "400px", marginBottom: "1rem" }}>
            <MapContainer
              center={selectedPosition || [37.8719, 32.4844]} // Use selected position if available, otherwise default to Konya
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              key={
                selectedPosition
                  ? `${selectedPosition[0]}-${selectedPosition[1]}`
                  : "default"
              } // Force re-render when position changes
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler />
              {selectedPosition && <Marker position={selectedPosition} />}
            </MapContainer>
          </div>
          <Form.Control
            className="edit-project-input"
            type="text"
            name="address"
            value={project.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">
            Total Construction Area (sqm)
          </Form.Label>
          <Form.Control
            className="edit-project-input"
            type="number"
            name="totalconstructionarea"
            value={project.totalconstructionarea}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">
            Total Apartments
          </Form.Label>
          <Form.Control
            className="edit-project-input"
            type="number"
            name="totalapartments"
            value={project.totalapartments}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">Room Types</Form.Label>
          <Form.Control
            className="edit-project-input"
            type="text"
            name="roomtype"
            value={project.roomtype}
            onChange={handleChange}
            placeholder="e.g., 1+1, 2+1, 3+1"
            required
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">Start Date</Form.Label>
          <Form.Control
            className="edit-project-input"
            type="date"
            name="startdate"
            value={project.startdate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">Delivery Date</Form.Label>
          <Form.Control
            className="edit-project-input"
            type="date"
            name="deliverydate"
            value={project.deliverydate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Check
            className="edit-project-checkbox"
            type="checkbox"
            label="Available for Sale"
            name="availableforsale"
            checked={project.availableforsale}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">Description</Form.Label>
          <Form.Control
            className="edit-project-input edit-project-textarea"
            as="textarea"
            name="description"
            value={project.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Form.Group className="edit-project-form-group">
          <Form.Label className="edit-project-label">Project Images</Form.Label>
          <ImageUpload
            projectId={id}
            existingImages={projectImages}
            onImagesChange={setProjectImages}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="edit-project-submit-btn"
        >
          Update Project
        </Button>
      </Form>
    </Container>
  );
};

export default EditProject;
