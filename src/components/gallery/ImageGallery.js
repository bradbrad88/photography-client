import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import ImageCard from "./ImageCard";
import Fullscreen from "./Fullscreen";
// import { fetchGallery } from "../../utils/gallery";
import "../../stylesheets/ImageGallery.css";

const ImageGallery = ({ images, editMode }) => {
  // const [savedGallery, setSavedGallery] = useState(null);
  const [error, setError] = useState(null);
  const [viewImage, setViewImage] = useState();
  useEffect(() => {
    // getGallery();
    window.addEventListener("click", cancelFullScreen);
    preloadHighres();
    return () => window.removeEventListener("click", cancelFullScreen);
  }, []);

  // const getGallery = async () => {
  //   const gallery = await fetchGallery();
  //   if (gallery.error) return setError(gallery.error);
  //   setSavedGallery(gallery.data);
  // };

  const layout = images.map(image => ({
    i: image.image_id.toString(),
    x: image.x,
    y: image.y,
    w: image.w,
    h: image.h,
  }));

  const preloadHighres = async () => {
    console.log("edit mode?", editMode);
    if (editMode) return;
    images.forEach(image => {
      const img = (new Image().src = image.highres);
    });
  };

  // if (!savedGallery && !error) getGallery();

  const handleClick = image => {
    console.log("handle click", editMode);
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

  // console.log("gosh", savedGallery);

  if (error)
    return (
      <div className={"gallery error"}>
        Unable to load image gallery
        <br />
        {error}
        <button className={"btn-gallery-refresh"}>Refresh</button>
      </div>
    );

  console.log("layout", layout);

  return (
    <>
      {viewImage && (
        <Fullscreen
          image={viewImage}
          nextImage={handleNextImage}
          previousImage={handlePreviousImage}
          exit={cancelFullScreen}
        />
      )}
      <GridLayout
        width={1500}
        layout={layout}
        cols={12}
        rowHeight={20}
        isDraggable={false}
        isResizable={false}
        margin={[20, 20]}
        className={"image-gallery"}
      >
        {imageCards}
      </GridLayout>
    </>
  );
};

export default ImageGallery;
