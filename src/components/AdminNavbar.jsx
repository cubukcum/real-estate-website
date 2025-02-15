import React from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";
import config from "../config.admin.json";
export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <nav className="admin-nav">
      <Link to="/" className="admin-site-title">
        {config.adminNavbar.companyName}
      </Link>
      <ul>
        <CustomLink to="/admin/dashboard">
          {config.adminNavbar.dashboard}
        </CustomLink>
        <CustomLink to="/admin/manage-projects">
          {config.adminNavbar.manageProjects}
        </CustomLink>
        <li>
          <button className="admin-nav-button" onClick={handleLogout}>
            {config.adminNavbar.logout}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
