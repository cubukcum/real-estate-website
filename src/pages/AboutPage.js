import React from "react";
import "../styles/AboutPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
        <div className="hero-overlay">
          <h1>Welcome to [Your Company Name]</h1>
          <p>Building Homes, Creating Communities</p>
        </div>
      </section>

      {/* About Company Section */}
      <section className="about-company container my-5">
        <h2>About Us</h2>
        <p>
          [Your Company Name] has been a leader in real estate development for
          over a decade. Our mission is to create sustainable, high-quality
          living spaces that bring comfort and joy to families. With a focus on
          innovation, integrity, and customer satisfaction, we have successfully
          delivered numerous projects that exceed expectations.
        </p>
        <p>
          We specialize in designing modern, eco-friendly communities that
          enhance urban living while maintaining harmony with the environment.
        </p>
      </section>

      {/* Core Values Section */}
      <section className="core-values container my-5">
        <h2>Our Core Values</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <i className="fas fa-leaf fa-3x mb-3"></i>
            <h4>Sustainability</h4>
            <p>
              We build eco-friendly communities to ensure a better future for
              everyone.
            </p>
          </div>
          <div className="col-md-4">
            <i className="fas fa-users fa-3x mb-3"></i>
            <h4>Customer Focus</h4>
            <p>Our clients are at the heart of everything we do.</p>
          </div>
          <div className="col-md-4">
            <i className="fas fa-building fa-3x mb-3"></i>
            <h4>Quality</h4>
            <p>
              We deliver homes that meet the highest standards of quality and
              design.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info container my-5">
        <h2>Contact Us</h2>
        <p>
          <strong>Phone:</strong> +1 234 567 890
        </p>
        <p>
          <strong>Email:</strong> info@yourcompany.com
        </p>
        <p>
          <strong>Address:</strong> 123 Real Estate Avenue, Downtown City
        </p>
        <div className="social-media-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="google-maps container my-5">
        <h2>Visit Us</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.9283446497575!2d-122.08424998469276!3d37.42199997982425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5c1f3087eeb%3A0x78d92e2b7fd3ba07!2sGoogleplex!5e0!3m2!1sen!2sus!4v1691415232066!5m2!1sen!2sus"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            title="Company Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
