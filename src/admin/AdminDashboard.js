import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaUsers, FaProjectDiagram, FaChartLine } from "react-icons/fa";
import "../styles/AdminDashboard.css";
import configAdmin from "../config.admin.json";

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
      title: configAdmin.dashboard.sections.overview.cards[0],
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "#4e73df",
    },
    {
      title: configAdmin.dashboard.sections.overview.cards[1],
      value: stats.totalProjects,
      icon: <FaProjectDiagram />,
      color: "#1cc88a",
    },
    {
      title: configAdmin.dashboard.sections.overview.cards[2],
      value: stats.activeProjects,
      icon: <FaChartLine />,
      color: "#36b9cc",
    },
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case configAdmin.dashboard.sections.quickActions.actions[0]:
        navigate("/admin/messages");
        break;
      // Add other cases as needed
      default:
        break;
    }
  };

  return (
    <Container fluid className="admin-dashboard">
      <h2 className="dashboard-title">{configAdmin.dashboard.title}</h2>
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
              <h5>{configAdmin.dashboard.sections.quickActions.title}</h5>
              <div className="quick-actions-grid">
                <button
                  onClick={() =>
                    handleQuickAction(
                      configAdmin.dashboard.sections.quickActions.actions[0]
                    )
                  }
                >
                  {configAdmin.dashboard.sections.quickActions.actions[0]}
                </button>
                <button>
                  {configAdmin.dashboard.sections.quickActions.actions[1]}
                </button>
                <button>
                  {configAdmin.dashboard.sections.quickActions.actions[2]}
                </button>
                <button>
                  {configAdmin.dashboard.sections.quickActions.actions[3]}
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="system-status-card">
            <Card.Body>
              <h5>{configAdmin.dashboard.sections.systemStatus.title}</h5>
              {/* Add system status information here */}
              <div className="status-item">
                <span>
                  {configAdmin.dashboard.sections.systemStatus.items[0]}:
                </span>
                <span className="status-badge success">Online</span>
              </div>
              <div className="status-item">
                <span>
                  {configAdmin.dashboard.sections.systemStatus.items[1]}:
                </span>
                <span>2 hours ago</span>
              </div>
              <div className="status-item">
                <span>
                  {configAdmin.dashboard.sections.systemStatus.items[2]}:
                </span>
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
