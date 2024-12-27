import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import "./ManageProjects.css";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: { Authorization: token },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, [token]);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/admin/delete-project/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => setProjects((prev) => prev.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting project:", error));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-project/${id}`);
  };

  return (
    <Container className="manage-projects-container">
      <div className="manage-projects-header">
        <h2>Manage Projects</h2>
        <Button 
          variant="success" 
          onClick={() => navigate("/admin/add-project")}
        >
          <i className="fas fa-plus"></i> Add New Project
        </Button>
      </div>
      
      <Table className="projects-table" striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Address</th>
            <th>Total Apartments</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <strong>{project.title}</strong>
              </td>
              <td>{project.address}</td>
              <td className="text-center">{project.totalapartments}</td>
              <td>
                <span className={`status-badge ${
                  project.availableforsale 
                    ? 'status-available' 
                    : 'status-unavailable'
                }`}>
                  {project.availableforsale ? 'Available' : 'Not Available'}
                </span>
              </td>
              <td className="action-buttons">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEdit(project.id)}
                >
                  <i className="fas fa-edit"></i> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageProjects;
