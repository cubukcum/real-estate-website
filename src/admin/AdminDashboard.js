import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/projects">Manage Projects</Link>
        </li>
        <li>
          <Link to="/admin/apartments">Manage Apartments</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
