import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import Fullscreen from "./Fullscreen";
import { fetchGallery } from "../../utils/gallery";
import "../../stylesheets/ImageGallery.css";

const ImageGallery = ({ images, options }) => {
  const [savedGallery, setSavedGallery] = useState(null);
  const [error, setError] = useState(null);
  const [viewImage, setViewImage] = useState();
  useEffect(() => {
    window.addEventListener("click", cancelFullScreen);
    return () => window.removeEventListener("click", cancelFullScreen);
  }, []);
  const getGallery = async () => {
    const gallery = await fetchGallery();
    if (gallery.error) return setError(gallery.error);
    setSavedGallery(gallery.data);
  };

  if (!savedGallery && !error) getGallery();

  const handleClick = id => {
    setViewImage(id);
    document.body.classList.add("noscroll");
  };

  const cancelFullScreen = () => {
    setViewImage();
    document.body.classList.remove("noscroll");
  };

  const imageCards = images?.map(image => {
    return (
      <ImageCard image={image} key={image.image_id} handleClick={handleClick} />
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
  console.log("image", viewImage);
  return (
    <>
      {viewImage && <Fullscreen image={viewImage} />}
      <div className="gallery">
        <div
          className="image-gallery"
          style={{
            gridTemplateColumns: `repeat(${options.gallery_columns}, minmax(350px, 1fr))`,
          }}
        >
          {imageCards}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
