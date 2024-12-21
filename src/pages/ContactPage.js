import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/ContactPage.css";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <Container className="contact-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="contact-card">
            <h1 className="text-center mb-4">Contact Us</h1>
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
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
