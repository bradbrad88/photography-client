import React, { useContext } from "react";
import GalleryEditContext from "../contexts/GalleryEditContext";
import ImageUploadCard from "./ImageUploadCard";
const ImageBank = () => {
  const editContext = useContext(GalleryEditContext);
  const imageCards = () => {
    return editContext.imageBank
      .sort((a, b) => {
        return b.date_uploaded - a.date_uploaded;
      })
      .map(image => {
        return (
          <ImageUploadCard
            image={image}
            key={image.image_id ? image.image_id : image.upload.key}
          />
        );
      });
  };

  const selectionLength = () => {
    return editContext.imageBank.filter(image => image.selected).length;
  };

  return (
    <>
      <div className={"ui"}>
        <span>{`${selectionLength()} image${
          selectionLength() === 1 ? "" : "s"
        } selected`}</span>
        <button onClick={editContext.selectAllBank}>Select All</button>
        <button onClick={editContext.addToDisplay}>Add to Gallery</button>
        <button onClick={editContext.deleteSelectedBank}>Delete</button>
      </div>
      <div className={"dropped-files"}>{imageCards()}</div>
    </>
  );
};

export default ImageBank;
