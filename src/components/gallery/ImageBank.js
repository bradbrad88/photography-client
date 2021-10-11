import React, { useContext } from "react";
import GalleryEditContext from "../contexts/GalleryEditContext";
import ImageUploadCard from "./ImageUploadCard";

const ImageBank = () => {
  const editContext = useContext(GalleryEditContext);

  const imageCards = () => {
    return editContext.imageBank
      .filter(
        image =>
          !editContext.layouts.some(
            layout => parseInt(layout.i) === parseInt(image.image_id)
          )
      ) //filter out images that are on display
      .sort((a, b) => {
        return b.date_uploaded - a.date_uploaded;
      })
      .map(image => {
        return <ImageUploadCard image={image} key={image.image_id} />;
      });
  };

  const selectionLength = () => {
    return editContext.imageBank.filter(image => image.selected).length;
  };

  const handleDrop = e => {
    e.preventDefault();
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  return (
    <>
      <div className={"ui"} onDrop={handleDrop} onDragOver={handleDragOver}>
        <span>{`${selectionLength()} image${
          selectionLength() === 1 ? "" : "s"
        } selected`}</span>
        <button onClick={editContext.selectAllBank}>Select All</button>
        <button onClick={editContext.test}>Test</button>
        <button onClick={editContext.deleteSelectedBank}>Delete</button>
        <button onClick={editContext.saveDisplay}>Save</button>
        <button onClick={editContext.resetLayout}>Reset</button>
      </div>
      <div
        className={"dropped-files"}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {imageCards()}
      </div>
    </>
  );
};

export default ImageBank;
