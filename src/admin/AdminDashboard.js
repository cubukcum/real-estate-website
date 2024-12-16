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
      .get("http://localhost:5000/admin/verify-token", {
        headers: { Authorization: token },
      })
      .then(() => {
        // Token is valid, fetch projects
        axios
          .get("http://localhost:5000/projects", {
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
      .delete(`http://localhost:5000/projects/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => setProjects((prev) => prev.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting project:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/admin");
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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
