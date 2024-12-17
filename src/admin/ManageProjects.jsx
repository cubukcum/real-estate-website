import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      .delete(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => setProjects((prev) => prev.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting project:", error));
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-project/${id}`);
  };

  return (
    <div className="manage-projects">
      <h2>Manage Projects</h2>
      <button onClick={() => navigate("/admin/add-project")}>
        Add New Project
      </button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.location}</td>
              <td>
                <button onClick={() => handleEdit(project.id)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProjects;
