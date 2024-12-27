import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [project, setProject] = useState({
    title: '',
    address: '',
    totalconstructionarea: '',
    totalapartments: '',
    roomtype: '',
    startdate: '',
    deliverydate: '',
    availableforsale: false,
    description: ''
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const projectData = {
          ...response.data,
          totalconstructionarea: response.data.totalconstructionarea,
          totalapartments: response.data.totalapartments,
          roomtype: response.data.roomtype,
          startdate: response.data.startdate.split('T')[0],
          deliverydate: response.data.deliverydate.split('T')[0],
          availableforsale: response.data.availableforsale
        };
        setProject(projectData);
      } catch (error) {
        setError('Failed to fetch project details');
        console.error('Error:', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedProject = {
        ...project,
        totalConstructionArea: project.totalconstructionarea,
        totalApartments: project.totalapartments,
        roomType: project.roomtype,
        startDate: project.startdate,
        deliveryDate: project.deliverydate,
        availableForSale: project.availableforsale
      };
      await axios.put(`${process.env.REACT_APP_API_URL}/admin/edit-project/${id}`, transformedProject);
      setSuccess('Project updated successfully');
      setTimeout(() => {
        navigate('/admin/manage-projects');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update project');
      console.error('Error:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Project</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={project.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Construction Area (sqm)</Form.Label>
          <Form.Control
            type="number"
            name="totalconstructionarea"
            value={project.totalconstructionarea}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Apartments</Form.Label>
          <Form.Control
            type="number"
            name="totalapartments"
            value={project.totalapartments}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Room Types</Form.Label>
          <Form.Control
            type="text"
            name="roomtype"
            value={project.roomtype}
            onChange={handleChange}
            placeholder="e.g., 1+1, 2+1, 3+1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startdate"
            value={project.startdate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Delivery Date</Form.Label>
          <Form.Control
            type="date"
            name="deliverydate"
            value={project.deliverydate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Available for Sale"
            name="availableforsale"
            checked={project.availableforsale}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={project.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Project
        </Button>
      </Form>
    </Container>
  );
};

export default EditProject; 