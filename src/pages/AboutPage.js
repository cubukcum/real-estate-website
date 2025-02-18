import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/shared.css";
import "../styles/AboutPage.css";
import background2 from "../assets/about-page/background2.jpg";
import background5 from "../assets/about-page/background5.jpg";
import config from "../config.json";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${background2})`,
        }}
      >
        <div className="hero-content">
          <p className="hero-subtitle">
            {config.siteContent.aboutPage.heroTitle}
          </p>
        </div>
      </section>

      <Container>
        {/* About Company Section */}
        <section className="luxury-section">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="luxury-content">
                <div
                  className="section-label"
                  style={{
                    color: "var(--luxury-gold)",
                    fontSize: "1.1rem",
                    letterSpacing: "3px",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  {config.siteContent.aboutPage.sectionLabel1}
                </div>
                <h2>{config.siteContent.aboutPage.title}</h2>
                <p className="luxury-text">
                  {config.siteContent.aboutPage.description}
                </p>
                <p className="luxury-text">
                  {config.siteContent.aboutPage.additionalDescription}
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src={background5}
                alt="Luxury Interior"
                className="luxury-image"
              />
            </Col>
          </Row>
        </section>

        {/* Core Values Section */}
        <section className="luxury-section">
          <h2 className="text-center mb-5">
            {config.siteContent.aboutPage.sectionLabel2}
          </h2>
          <Row>
            <Col lg={4}>
              <Card className="luxury-card">
                <Card.Body>
                  <i className="fas fa-gem fa-2x mb-4"></i>
                  <Card.Title>{config.siteContent.aboutPage.title2}</Card.Title>
                  <Card.Text>
                    {config.siteContent.aboutPage.description2}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="luxury-card">
                <Card.Body>
                  <i className="fas fa-crown fa-2x mb-4"></i>
                  <Card.Title>{config.siteContent.aboutPage.title3}</Card.Title>
                  <Card.Text>
                    {config.siteContent.aboutPage.description3}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="luxury-card">
                <Card.Body>
                  <i className="fas fa-leaf fa-2x mb-4"></i>
                  <Card.Title>{config.siteContent.aboutPage.title4}</Card.Title>
                  <Card.Text>
                    {config.siteContent.aboutPage.description4}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default AboutPage;
