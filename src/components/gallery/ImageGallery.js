import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import Fullscreen from "./Fullscreen";
import { fetchGallery } from "../../utils/gallery";
import "../../stylesheets/ImageGallery.css";

const ImageGallery = ({ images, options, editMode }) => {
  const [savedGallery, setSavedGallery] = useState(null);
  const [error, setError] = useState(null);
  const [viewImage, setViewImage] = useState();
  useEffect(() => {
    window.addEventListener("click", cancelFullScreen);
    preloadHighres();
    return () => window.removeEventListener("click", cancelFullScreen);
  }, []);

  const getGallery = async () => {
    const gallery = await fetchGallery();
    if (gallery.error) return setError(gallery.error);
    setSavedGallery(gallery.data);
  };

  const preloadHighres = async () => {
    console.log("edit mode?", editMode);
    if (editMode) return;
    images.forEach(image => {
      const img = (new Image().src = image.highres);
    });
  };

  if (!savedGallery && !error) getGallery();

  const handleClick = image => {
    if (editMode) return;
    setViewImage(image);
    document.body.classList.add("noscroll");
  };

  const cancelFullScreen = () => {
    setViewImage();
    document.body.classList.remove("noscroll");
  };

  const handlePreviousImage = () => {
    let prevImageIndex;
    if (images.indexOf(viewImage) === 0) {
      prevImageIndex = images.length - 1;
    } else {
      prevImageIndex = images.indexOf(viewImage) - 1;
    }
    setViewImage(images[prevImageIndex]);
  };

  const handleNextImage = () => {
    let nextImageIndex;
    if (images.indexOf(viewImage) === images.length - 1) {
      nextImageIndex = 0;
    } else {
      nextImageIndex = images.indexOf(viewImage) + 1;
    }
    setViewImage(images[nextImageIndex]);
  };

  const imageCards = images?.map(image => {
    return (
      <ImageCard
        image={image}
        key={image.image_id}
        handleClick={editMode ? null : handleClick}
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

  return (
    <>
      {viewImage && (
        <Fullscreen
          image={viewImage}
          nextImage={handleNextImage}
          previousImage={handlePreviousImage}
        />
      )}
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
