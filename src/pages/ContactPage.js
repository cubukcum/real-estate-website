import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsTelephone, BsEnvelope, BsPinMap } from 'react-icons/bs';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "../styles/ContactPage.css";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <Container fluid className="contact-container">
      <div className="contact-wrapper">
        <h2 className="section-title text-center mb-5">Let's Connect</h2>
        
        <div className="contact-grid">
          {/* Reach Out Section */}
          <div className="contact-content reach-out-section">
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

          {/* Contact Form Section */}
          <div className="contact-card message-section">
            <h3 className="contact-subtitle">Send Us a Message</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  required
                  className="contact-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  className="contact-input"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Your message"
                  required
                  className="contact-input"
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="contact-button">
                  Send Message
                </Button>
              </div>
            </Form>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <h3 className="contact-subtitle">Find Us Here</h3>
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
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
