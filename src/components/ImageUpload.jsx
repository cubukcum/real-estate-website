import { useState } from 'react';

const ImageUpload = ({ projectId }) => {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('project_id', 4);

        setUploading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const imageData = await response.json();
            setImages(prev => [...prev, imageData]);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input 
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
            />
            
            {uploading && <p>Uploading...</p>}
            
            <div className="image-gallery">
                {images.map(image => (
                    <img 
                        key={image.id}
                        src={image.url}
                        alt={image.file_name}
                        style={{ maxWidth: '200px', margin: '10px' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;