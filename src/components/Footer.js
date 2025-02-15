import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";
import config from "../config.json";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <h2>{config.companyInfo.name}</h2>
          <p>{config.siteContent.footer.companyDescription}</p>
          <p>
            © 2025 {config.siteContent.footer.companyName}{" "}
            {config.siteContent.footer.allRightsReserved}
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>{config.siteContent.footer.quickLinks[0]}</h3>
          <ul>
            <li>
              <a href="/">{config.siteContent.footer.quickLinks[1]}</a>
            </li>
            <li>
              <a href="/about">{config.siteContent.footer.quickLinks[2]}</a>
            </li>
            <li>
              <a href="/projects">
                {" "}
                {config.siteContent.footer.quickLinks[3]}{" "}
              </a>
            </li>
            <li>
              <a href="/contact"> {config.siteContent.footer.quickLinks[4]} </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>{config.siteContent.footer.contactUs.titles[0]}</h3>
          <p>
            {config.siteContent.footer.contactUs.titles[1]}:{" "}
            {config.companyInfo.email}
          </p>
          <p>
            {config.siteContent.footer.contactUs.titles[2]}:{" "}
            {config.companyInfo.phone}
          </p>
          <p>
            {config.siteContent.footer.contactUs.titles[3]}:{" "}
            {config.companyInfo.address}
          </p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>{config.siteContent.footer.followusTitle}</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
