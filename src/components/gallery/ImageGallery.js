import React, { useState, useContext } from "react";

import { useHistory, useLocation } from "react-router-dom";
import ImageCard from "./ImageCard";
import EditFeatures from "./EditFeatures";
import UserContext from "../contexts/UserContext";
import { fetchGallery } from "../../utils/fetchGallery";
import "../../stylesheets/ImageGallery.css";

const ImageGallery = () => {
  const [gallery, setGallery] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const getGallery = async () => {
    const gallery = await fetchGallery(userContext.authenticated);
    if (gallery.error) return setError(gallery.error);
    setGallery(gallery.data);
  };

  if (location.pathname !== "/gallery/edit" && selected.length > 0) setSelected([]);

  if (!gallery && !error) getGallery();

  const onEditGallery = event => {
    event.preventDefault();
    if (userContext.authenticated) history.push("/gallery/edit");
  };

  const editMode = () => {
    return location.pathname === "/gallery/edit";
  };

  const onDelete = async () => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          authorization: userContext.authenticated,
        },
        body: JSON.stringify(selected),
        method: "POST",
      };
      const result = await fetch("http://localhost:5000/gallery/delete", options);
      const data = await result.json();
      setGallery(data);
      setSelected([]);
    } catch (error) {
      setError(error.message);
    }
  };
  const onEmphasize = () => {
    const mapValues = `(${selected.map(item => item)})`;
    console.log(mapValues);
  };

  const onSelect = image_id => {
    if (location.pathname !== "/gallery/edit") return;
    if (!isSelected(image_id)) return setSelected([...selected, image_id]);
    const newSelection = selected.filter(el => el !== image_id);
    setSelected(newSelection);
  };

  const isSelected = key => {
    return selected.includes(key);
  };

  const images = gallery?.map(img => {
    return (
      <ImageCard
        image={img}
        key={img.image_id}
        onSelect={onSelect}
        selected={isSelected(img.image_id)}
      />
    );
  });

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
  // if (!gallery) return <div className="gallery">Loading</div>;

  return (
    <div className="gallery">
      {userContext.authenticated && !editMode() && (
        <button className="btn-edit-gallery" onClick={onEditGallery}>
          Edit Gallery
        </button>
      )}
      {userContext.authenticated && editMode() && (
        <EditFeatures onDelete={onDelete} onEmphasize={onEmphasize} />
      )}
      <div className="image-gallery">{images}</div>
    </div>
  );
};

export default ImageGallery;
