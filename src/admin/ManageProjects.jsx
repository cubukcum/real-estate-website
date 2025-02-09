import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { BsPlusLg } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import "../styles/ManageProjects.css";
import configAdmin from "../config.admin.json";

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
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/admin/delete-project/${id}`, {
          headers: { Authorization: token },
        })
        .then(() => setProjects((prev) => prev.filter((p) => p.id !== id)))
        .catch((error) => console.error("Error deleting project:", error));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-project/${id}`);
  };

  return (
    <Container className="manage-projects-container">
      <div className="manage-projects-header">
        <h2>{configAdmin.manageProjects.manageProjectsTitle}</h2>
        <Button 
          variant="success" 
          onClick={() => navigate("/admin/add-project")}
        >
          <BsPlusLg /> {configAdmin.manageProjects.manageAddNewProjectTitle}
        </Button>
      </div>
      
      <Table className="projects-table" striped bordered hover>
        <thead>
          <tr>
            <th>{configAdmin.manageProjects.tableColumns[0]}</th>
            <th>{configAdmin.manageProjects.tableColumns[1]}</th>
            <th>{configAdmin.manageProjects.tableColumns[2]}</th>
            <th>{configAdmin.manageProjects.tableColumns[3]}</th>
            <th>{configAdmin.manageProjects.tableColumns[4]}</th>
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
                  <FiEdit /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  <RiDeleteBinLine /> Delete
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
