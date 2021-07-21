import React, { useState, useContext, useEffect } from "react";
import EditContext from "../contexts/GalleryEditContext";
import ImageGallery from "./ImageGallery";
import DisplayPanel from "./DisplayPanel";
import "../../stylesheets/GalleryEdit.css";

const ImageGalleryEditDisplay = () => {
  const editContext = useContext(EditContext);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  const onDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setHover(true);
  };

  const onClick = e => {
    editContext.deselectAllDisplay();
  };

  const onDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    editContext.addToDisplay();
    setHover(false);
  };

  const onDragLeave = e => {
    setHover(false);
  };

  // const onClick = e => {
  //   editContext.deselectAllDisplay();
  // };

  // const imageCards = () => {
  //   console.log("edit context", editContext.imageDisplay);

  //   return editContext.imageDisplay.map(image => {
  //     console.log("image", image);
  //     return <ImageCard image={image} key={image.image_id} />;
  //   });
  // };

  return (
    <>
      <DisplayPanel />
      <div
        className={`gallery edit display ${hover ? "hover" : ""}`}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={editContext.deselectAllDisplay}
      >
        <ImageGallery
          images={editContext.imageDisplay}
          options={editContext.options}
          editMode={true}
        />
      </div>
    </>
  );
};

export default ImageGalleryEditDisplay;
