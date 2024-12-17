import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    availableApartments: 0,
    visitorsToday: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch dashboard stats from backend
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/stats`, {
        headers: { Authorization: token },
      })
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  return (
    <div className="dashboard-overview">
      <h2>Dashboard Overview</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{stats.totalProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Apartments for Sale</h3>
          <p>{stats.availableApartments}</p>
        </div>
        <div className="stat-card">
          <h3>Visitors Today</h3>
          <p>{stats.visitorsToday}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
