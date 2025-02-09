import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../styles/AdminLogin.css"; // Import the CSS file
import configAdmin from "../config.admin.json"

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="admin-login-container">
      <Form onSubmit={handleSubmit} className="admin-login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{configAdmin.adminLogin.emailTitle}</Form.Label>
          <Form.Control
            type="email"
            placeholder={configAdmin.adminLogin.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{configAdmin.adminLogin.passwordTitle}</Form.Label>
          <Form.Control
            type="password"
            placeholder={configAdmin.adminLogin.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
        {configAdmin.adminLogin.submitButton}
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
