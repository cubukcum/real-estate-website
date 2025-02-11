import React, { useState } from "react";
import { Button, Image, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../styles/ImageUpload.css";

const ImageUpload = ({ projectId, existingImages = [], onImagesChange }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setUploading(true);

    try {
      // Create FormData and append the file and project_id
      const formData = new FormData();
      // Note: The backend expects 'image' as the field name, not 'images'
      formData.append("image", files[0]); // Handle one file at a time
      formData.append("project_id", projectId);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // The response will contain a single image object
      onImagesChange([...existingImages, response.data]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/projects/${projectId}/images/${imageId}`
      );

      onImagesChange(existingImages.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="image-upload-container">
      <div className="existing-images">
        <Row>
          {existingImages.map((image, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="image-item"
            >
              <div className="image-wrapper">
                <Image
                  src={image.url}
                  alt={`Project image ${index + 1}`}
                  thumbnail
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="delete-btn"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Delete
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="upload-section">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          accept="image/*"
          id="image-upload"
          className="file-input"
          disabled={uploading}
        />
        <label htmlFor="image-upload" className="upload-label">
          {uploading ? "Uploading..." : "Choose Images"}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
