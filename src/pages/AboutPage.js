import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/AboutPage.css";
import background1 from "../assets/about-page/background1.jpg";
import background2 from "../assets/about-page/background2.jpg";
import background3 from "../assets/about-page/background3.jpg";
import background4 from "../assets/about-page/background4.jpg";
import background5 from "../assets/about-page/background5.jpg";
import { BsTelephone, BsEnvelope, BsPinMap } from 'react-icons/bs';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background2})`,
        }}
      >
        <div className="hero-content">
          <h1>Your Company Name</h1>
          <p className="hero-subtitle">Crafting Exceptional Living Experiences</p>
        </div>
      </section>

      <Container>
        {/* About Company Section */}
        <section className="luxury-section">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="luxury-content">
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

        {/* Contact Section */}
        <section className="luxury-section contact-section">
          <div className="contact-wrapper">
            <h2 className="section-title text-center mb-5">Let's Connect</h2>
            <Row className="justify-content-between">
              <Col lg={5}>
                <div className="contact-content">
                  <h3 className="contact-subtitle">Reach Out to Us</h3>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="icon-wrapper">
                        <BsTelephone />
                      </div>
                      <div className="contact-text">
                        <h4>Phone</h4>
                        <p>+1 234 567 890</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="icon-wrapper">
                        <BsEnvelope />
                      </div>
                      <div className="contact-text">
                        <h4>Email</h4>
                        <p>inquiries@yourcompany.com</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="icon-wrapper">
                        <BsPinMap />
                      </div>
                      <div className="contact-text">
                        <h4>Location</h4>
                        <p>123 Luxury Avenue,<br />Prestigious District</p>
                      </div>
                    </div>
                  </div>
                  <div className="social-media-icons">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                      {[
                        { Icon: FaFacebook, url: 'https://facebook.com' },
                        { Icon: FaTwitter, url: 'https://twitter.com' },
                        { Icon: FaInstagram, url: 'https://instagram.com' },
                        { Icon: FaLinkedin, url: 'https://linkedin.com' }
                      ].map(({ Icon, url }) => (
                        <a 
                          key={url}
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-link"
                        >
                          <Icon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.9283446497575!2d-122.08424998469276!3d37.42199997982425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5c1f3087eeb%3A0x78d92e2b7fd3ba07!2sGoogleplex!5e0!3m2!1sen!2sus!4v1691415232066!5m2!1sen!2sus"
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    title="Company Location"
                  ></iframe>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutPage;
