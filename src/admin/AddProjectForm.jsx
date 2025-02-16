import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddProjectForm.css";
import ImageUpload from "../components/ImageUpload";
import configAdmin from "../config.admin.json";
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

const AddProjectForm = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: "",
    address: "",
    totalConstructionArea: "",
    totalApartments: "",
    roomType: "",
    startDate: "",
    deliveryDate: "",
    availableForSale: false,
    description: "",
  });
  const [projectImages, setProjectImages] = useState([]);
  const [createdProjectId, setCreatedProjectId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // First create the project
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/add-project`,
        project,
        {
          headers: { Authorization: token },
        }
      );

      const projectId = response.data.id;
      setCreatedProjectId(projectId); // Store the project ID

      // If there are any pending images, they will be uploaded automatically
      // by the ImageUpload component when it receives the new projectId

      navigate("/admin/manage-projects");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Container className="mt-5">
      <div className="project-form-container">
        <h2 className="project-form-title">Add New Project</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {configAdmin.addProjectForm.projectAddNewTitle}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  {configAdmin.addProjectForm.projectAddressTitle}
                </Form.Label>
                <div style={{ height: "400px", marginBottom: "1rem" }}>
                  <MapContainer
                    center={[37.8719, 32.4844]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
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
                  type="text"
                  name="address"
                  value={project.address}
                  readOnly
                  placeholder="Click on the map to set coordinates"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  {configAdmin.addProjectForm.projectTotalAreaTitle}
                </Form.Label>
                <Form.Control
                  type="number"
                  name="totalConstructionArea"
                  value={project.totalConstructionArea}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  {configAdmin.addProjectForm.projectTotalApartmentsTitle}
                </Form.Label>
                <Form.Control
                  type="number"
                  name="totalApartments"
                  value={project.totalApartments}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {configAdmin.addProjectForm.projectRoomTypesTitle}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="roomType"
                  value={project.roomType}
                  onChange={handleChange}
                  placeholder="e.g., 1+1, 2+1, 3+1"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  {configAdmin.addProjectForm.projectStartTitle}
                </Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  {configAdmin.addProjectForm.projectDeliveryTitle}
                </Form.Label>
                <Form.Control
                  type="date"
                  name="deliveryDate"
                  value={project.deliveryDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>
              {configAdmin.addProjectForm.projectDescripton}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={project.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Available for Sale"
              name="availableForSale"
              checked={project.availableForSale}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              {configAdmin.addProjectForm.projectImagesTitle}
            </Form.Label>
            <ImageUpload
              projectId={createdProjectId}
              onImagesChange={setProjectImages}
              allowUploadWithoutId={true}
            />
          </Form.Group>

          <div className="button-group d-flex gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/manage-projects")}
            >
              {configAdmin.addProjectForm.projectCancelButton}
            </Button>
            <Button variant="primary" type="submit">
              {configAdmin.addProjectForm.projectAddNewButton}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProjectForm;
