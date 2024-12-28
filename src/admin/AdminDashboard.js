import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaUsers, FaProjectDiagram, FaChartLine } from "react-icons/fa";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    activeProjects: 0,
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [token]);

  const dashboardCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "#4e73df",
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: <FaProjectDiagram />,
      color: "#1cc88a",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: <FaChartLine />,
      color: "#36b9cc",
    },
  ];

  return (
    <Container fluid className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <Row className="mt-4">
        {dashboardCards.map((card, index) => (
          <Col key={index} md={4} sm={6} className="mb-4">
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle mb-2">{card.title}</h6>
                    <h3 className="card-numbers">{card.value}</h3>
                  </div>
                  <div className="card-icon" style={{ color: card.color }}>
                    {card.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col md={6} className="mb-4">
          <Card className="quick-actions-card">
            <Card.Body>
              <h5>Quick Actions</h5>
              <div className="quick-actions-grid">
                <button onClick={() => navigate("/admin/users")}>
                  Manage Users
                </button>
                <button onClick={() => navigate("/admin/settings")}>
                  Settings
                </button>
                <button onClick={() => navigate("/admin/reports")}>
                  View Reports
                </button>
                <button onClick={() => navigate("/admin/logs")}>
                  System Logs
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="system-status-card">
            <Card.Body>
              <h5>System Status</h5>
              {/* Add system status information here */}
              <div className="status-item">
                <span>Server Status:</span>
                <span className="status-badge success">Online</span>
              </div>
              <div className="status-item">
                <span>Last Backup:</span>
                <span>2 hours ago</span>
              </div>
              <div className="status-item">
                <span>System Load:</span>
                <span>Normal</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
