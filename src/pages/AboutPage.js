import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/AboutPage.css";
import background1 from "../assets/about-page/background1.jpg";
import background2 from "../assets/about-page/background2.jpg";
import background3 from "../assets/about-page/background3.jpg";
import background4 from "../assets/about-page/background4.jpg";
import background5 from "../assets/about-page/background5.jpg";

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
          <h1>Your Company Name</h1>
          <p className="hero-subtitle">Crafting Exceptional Living Experiences</p>
          <div className="hero-separator" style={{ 
            width: '60px', 
            height: '2px', 
            background: 'var(--luxury-gold)', 
            margin: '2rem auto' 
          }}></div>
        </div>
      </section>

      <Container>
        {/* About Company Section */}
        <section className="luxury-section">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="luxury-content">
                <div className="section-label" style={{ 
                  color: 'var(--luxury-gold)', 
                  fontSize: '1.1rem', 
                  letterSpacing: '3px',
                  marginBottom: '1rem',
                  textTransform: 'uppercase' 
                }}>Our Story</div>
                <h2>Our Legacy of Excellence</h2>
                <p className="luxury-text">
                  For over a decade, we have redefined luxury living through our commitment
                  to architectural excellence and unparalleled attention to detail. Each
                  residence we create is a masterpiece, designed to elevate the art of living.
                </p>
                <p className="luxury-text">
                  Our signature developments seamlessly blend innovative design with timeless
                  elegance, creating spaces that inspire and endure.
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <img src={background5} alt="Luxury Interior" className="luxury-image" />
            </Col>
          </Row>
        </section>

        {/* Core Values Section */}
        <section className="luxury-section">
          <h2 className="text-center mb-5">Our Guiding Principles</h2>
          <Row>
            <Col lg={4}>
              <Card className="luxury-card">
                <Card.Body>
                  <i className="fas fa-gem fa-2x mb-4"></i>
                  <Card.Title>Uncompromising Quality</Card.Title>
                  <Card.Text>
                    We pursue excellence in every detail, ensuring each residence
                    meets the highest standards of luxury and craftsmanship.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="luxury-card">
                <Card.Body>
                  <i className="fas fa-crown fa-2x mb-4"></i>
                  <Card.Title>Bespoke Design</Card.Title>
                  <Card.Text>
                    Each project is uniquely crafted to reflect the distinctive
                    vision and lifestyle of our discerning clientele.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="luxury-card">
                <Card.Body>
                  <i className="fas fa-leaf fa-2x mb-4"></i>
                  <Card.Title>Sustainable Luxury</Card.Title>
                  <Card.Text>
                    We seamlessly integrate environmental consciousness with
                    luxurious living spaces.
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
