import React, { useState, useEffect } from "react";
import "./ImageFeed.css"; // Optional CSS for styling

const ImageFeed = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch image URLs from your backend or static source
    fetch("/api/images") // Replace with your backend endpoint
      .then((response) => response.json())
      .then((data) => setImages(data.images));
  }, []);

  return (
    <div className="image-feed">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.url} alt={`Generated Image ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageFeed;