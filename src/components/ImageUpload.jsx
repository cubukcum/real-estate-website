import { useState } from 'react';
import '../styles/ImageUpload.css';

const ImageUpload = ({ projectId, existingImages = [], onImagesChange }) => {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState(existingImages);

    const handleUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('project_id', projectId);

                const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) throw new Error('Upload failed');
                return response.json();
            });

            const newImages = await Promise.all(uploadPromises);
            const updatedImages = [...images, ...newImages];
            setImages(updatedImages);
            onImagesChange(updatedImages); // Notify parent component
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload one or more images');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (imageId) => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/upload/delete/${imageId}`, {
                method: 'DELETE',
            });
            const updatedImages = images.filter(img => img.id !== imageId);
            setImages(updatedImages);
            onImagesChange(updatedImages);
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete image');
        }
    };

    return (
        <div className="image-upload-container">
            <div className="upload-input">
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    multiple
                />
                {uploading && <p>Uploading...</p>}
            </div>
            
            <div className="image-gallery">
                {images.map(image => (
                    <div key={image.id} className="image-preview">
                        <img 
                            src={image.url}
                            alt={image.file_name}
                            style={{ maxWidth: '200px', margin: '10px' }}
                        />
                        <button 
                            onClick={() => handleDelete(image.id)}
                            className="delete-image"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;