import React, { useState, useContext } from "react";
import ImageCard from "./ImageCard";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../../stylesheets/ImageGallery.css";

const ImageGallery = () => {
  const [gallery, setGallery] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const getGallery = async () => {
    try {
      const options = {
        headers: {
          authorization: userContext.authenticated,
        },
      };
      const response = await fetch("http://localhost:5000/gallery", options);
      const data = await response.json();
      if (data.error) {
        return setError(data.error);
      }
      setError(null);
      const orderedList = data.sort((a, b) => a.display_order - b.display_order);
      setGallery(orderedList);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!gallery && !error) getGallery();
  if (error)
    return (
      <div className={"gallery error"}>
        Unable to load image gallery
        <br />
        {error}
        <button className={"btn-gallery-refresh"} onClick={getGallery}>
          Refresh
        </button>
      </div>
    );
  if (!gallery) return <div>Loading</div>;
  const onEditGallery = event => {
    event.preventDefault();
    if (userContext.authenticated) history.push("/gallery/edit");
  };

  const images = gallery.map(img => {
    return <ImageCard image={img} key={img.image_id} />;
  });
  return (
    <div className="gallery">
      {userContext.authenticated && (
        <button className="btn-edit-gallery" onClick={onEditGallery}>
          Edit Gallery
        </button>
      )}
      <div className="image-gallery">{images}</div>
    </div>
  );
};

export default ImageGallery;
