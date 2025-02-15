import React from "react";
import { Container } from "react-bootstrap";
import { FaTools, FaClock } from "react-icons/fa";
import "../styles/MaintenancePage.css";

const MaintenancePage = () => {
  return (
    <Container fluid className="maintenance-page">
      <div className="maintenance-content">
        <div className="maintenance-icon">
          <FaTools />
        </div>
        <h1>We're Making Things Better!</h1>
        <p className="maintenance-message">
          Our team is working hard to bring you an improved experience. We
          apologize for any inconvenience and appreciate your patience.
        </p>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <div className="estimated-time">
          <FaClock className="clock-icon" />
          <p>Expected completion time: 2 hours</p>
        </div>
        <div className="maintenance-features">
          <div className="feature">
            <span className="feature-dot"></span>
            <p>System Upgrades</p>
          </div>
          <div className="feature">
            <span className="feature-dot"></span>
            <p>Performance Improvements</p>
          </div>
          <div className="feature">
            <span className="feature-dot"></span>
            <p>Enhanced Security</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MaintenancePage;
