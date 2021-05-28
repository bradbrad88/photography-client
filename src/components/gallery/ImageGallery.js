import React, { useState } from "react";
import ImageCard from "./ImageCard";
import { Link } from "react-router-dom";
import "../../stylesheets/ImageGallery.css";

const ImageGallery = () => {
  const [gallery, setGallery] = useState(null);
  const [error, setError] = useState(null);
  const getGallery = async () => {
    try {
      const response = await fetch("http://localhost:5000/gallery");
      const data = await response.json();
      const orderedList = data.sort((a, b) => {
        return a.display_order - b.display_order;
      });
      setGallery(orderedList);
    } catch (err) {
      console.error("request error: ", err.message);
      setError(err);
    }
  };

  if (!gallery && !error) getGallery();
  if (error)
    return (
      <div>
        Unable to load image gallery
        <br />
        {error.message}
        <button className={"btn-gallery-refresh"} onClick={getGallery}>
          Refresh
        </button>
      </div>
    );
  if (!gallery) return <div>Loading</div>;

  const images = gallery.map((img) => {
    return <ImageCard image={img} key={img.image_id} />;
  });
  return (
    <div className="gallery">
      <Link to="/gallery/edit">
        <button id="btn-edit-gallery">Edit Gallery</button>
      </Link>
      <div className="image-gallery">{images}</div>
    </div>
  );
};

export default ImageGallery;
