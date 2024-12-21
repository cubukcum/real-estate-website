import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Verify the token and fetch projects
    if (!token) {
      navigate("/admin"); // Redirect to login if no token
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/verify-token`, {
        headers: { Authorization: token },
      })
      .then(() => {
        // Token is valid, fetch projects
        axios
          .get(`${process.env.REACT_APP_API_URL}/projects`, {
            headers: { Authorization: token },
          })
          .then((response) => setProjects(response.data))
          .catch((error) => console.error("Error fetching projects:", error));
      })
      .catch(() => {
        // Token is invalid or expired
        localStorage.removeItem("token");
        navigate("/admin"); // Redirect to login page
      });
  }, [token, navigate]);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => setProjects((prev) => prev.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting project:", error));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
