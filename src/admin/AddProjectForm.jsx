import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/AddProjectForm.css';
import ImageUpload from '../components/ImageUpload';

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
    description: ""
  });
  const [projectImages, setProjectImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/add-project`,
        { ...project, images: projectImages },
        {
          headers: { Authorization: token }
        }
      );
      navigate("/admin/manage-projects");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={project.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Total Construction Area (sqm)</Form.Label>
                <Form.Control
                  type="number"
                  name="totalConstructionArea"
                  value={project.totalConstructionArea}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Total Apartments</Form.Label>
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
                <Form.Label>Room Types</Form.Label>
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
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Delivery Date</Form.Label>
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
            <Form.Label>Description</Form.Label>
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
            <Form.Label>Project Images</Form.Label>
            <ImageUpload 
              projectId={null}
              onImagesChange={setProjectImages}
            />
          </Form.Group>

          <div className="button-group d-flex gap-2">
            <Button variant="primary" type="submit">
              Add Project
            </Button>
            <Button variant="secondary" onClick={() => navigate("/admin/manage-projects")}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProjectForm; 