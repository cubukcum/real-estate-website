import React, { useState, useEffect } from "react";
import { Button, Image, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../styles/ImageUpload.css";

const ImageUpload = ({
  projectId,
  existingImages = [],
  onImagesChange,
  allowUploadWithoutId = false,
}) => {
  const [pendingFiles, setPendingFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Watch for projectId changes to upload pending files
  useEffect(() => {
    if (projectId && pendingFiles.length > 0) {
      uploadPendingFiles();
    }
  }, [projectId]);

  const uploadPendingFiles = async () => {
    if (!projectId) return;

    setUploading(true);
    try {
      for (const file of pendingFiles) {
        const formData = new FormData();
        formData.append("image", file);
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
        onImagesChange((prev) => [...prev, response.data]);
      }
      setPendingFiles([]); // Clear pending files after upload
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);

    if (!projectId && allowUploadWithoutId) {
      // Store files to upload later when we have the project ID
      setPendingFiles((prev) => [...prev, ...files]);
      // Show preview of pending files
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      onImagesChange((prev) => [
        ...prev,
        ...previewUrls.map((url) => ({ url, isPending: true })),
      ]);
      return;
    }

    // If we have a project ID, upload immediately
    setUploading(true);
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);
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
        uploadedImages.push(response.data);
      }
      onImagesChange([...existingImages, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
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
                {!image.isPending && projectId && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="delete-btn"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    Delete
                  </Button>
                )}
                {image.isPending && (
                  <div className="pending-overlay">Pending Upload...</div>
                )}
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
