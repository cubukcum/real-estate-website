import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { BsTelephone, BsEnvelope, BsPinMap } from "react-icons/bs";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/shared.css";
import "../styles/ContactPage.css";
import config from "../config.json";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.elements[0].value,
      email: e.target.elements[1].value,
      message: e.target.elements[2].value,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully!",
        });
        e.target.reset(); // Clear the form
      } else {
        setFormStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <Container fluid className="contact-container">
      <div className="contact-wrapper">
        <h2 className="contact-section-title text-center mb-5">
          {config.siteContent.contactPage.title}
        </h2>

        <div className="contact-grid">
          {/* Reach Out Section */}
          <div className="contact-content reach-out-section">
            <h3 className="contact-subtitle">
              {config.siteContent.contactPage.subtitle}
            </h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="icon-wrapper">
                  <BsTelephone />
                </div>
                <div className="contact-text">
                  <h4>{config.siteContent.contactPage.phoneTitle}</h4>
                  <p>{config.companyInfo.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-wrapper">
                  <BsEnvelope />
                </div>
                <div className="contact-text">
                  <h4>{config.siteContent.contactPage.emailTitle}</h4>
                  <p>{config.companyInfo.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-wrapper">
                  <BsPinMap />
                </div>
                <div className="contact-text">
                  <h4>{config.siteContent.contactPage.addressTitle}</h4>
                  <p>{config.companyInfo.address}</p>
                </div>
              </div>
            </div>
            <div className="social-media-icons">
              <h4>{config.siteContent.contactPage.connectTitle}</h4>
              <div className="social-links">
                {[
                  {
                    Icon: FaFacebook,
                    url: config.siteContent.contactPage.facebookUrl,
                  },
                  {
                    Icon: FaTwitter,
                    url: config.siteContent.contactPage.twitterUrl,
                  },
                  {
                    Icon: FaInstagram,
                    url: config.siteContent.contactPage.instagramUrl,
                  },
                  {
                    Icon: FaLinkedin,
                    url: config.siteContent.contactPage.linkedinUrl,
                  },
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
            <h3 className="contact-subtitle">
              {config.siteContent.contactPage.formTitle}
            </h3>
            {formStatus.message && (
              <div
                className={`alert ${
                  formStatus.type === "success"
                    ? "alert-success"
                    : "alert-danger"
                }`}
              >
                {formStatus.message}
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={config.siteContent.contactPage.namePlaceholder}
                  required
                  className="contact-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder={config.siteContent.contactPage.emailPlaceholder}
                  required
                  className="contact-input"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder={
                    config.siteContent.contactPage.messagePlaceholder
                  }
                  required
                  className="contact-input"
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="contact-button">
                  {config.siteContent.contactPage.buttonText}
                </Button>
              </div>
            </Form>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <h3 className="contact-subtitle">
              {config.siteContent.contactPage.mapTitle}
            </h3>
            <div className="map-container">
              <iframe
                src={config.siteContent.contactPage.mapUrl}
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
