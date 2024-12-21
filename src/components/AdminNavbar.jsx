import React from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css"

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Site Name
      </Link>
      <ul>
        <CustomLink to="/admin/dashboard">Dashboard</CustomLink>
        <CustomLink to="/admin/manage-projects">My Projects</CustomLink>
        <li>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
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
