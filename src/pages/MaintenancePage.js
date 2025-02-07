import React from 'react';
import { Container } from 'react-bootstrap';

const MaintenancePage = () => {
  return (
    <Container fluid className="maintenance-page">
      <div className="maintenance-content">
        <h1>We're Under Maintenance</h1>
        <p>We're working hard to improve our website and will be back soon.</p>
        <div className="estimated-time">
          <p>Estimated completion time: [Your Expected Time]</p>
        </div>
      </div>
    </Container>
  );
};

export default MaintenancePage; 