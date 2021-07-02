import React, { useContext } from "react";
import GalleryEditContext from "../contexts/GalleryEditContext";
import "../../stylesheets/GalleryEdit.css";

const ImageUploadCard = ({ image }) => {
  const editContext = useContext(GalleryEditContext);
  const renderStatus = () => {
    return image.status?.map((status, index) => {
      return (
        <div
          key={status.step}
          className={`status-item ${
            status.inProgress && !status.error ? "in-progress" : ""
          } ${status.complete ? "complete" : ""} ${status.error ? "error" : ""}`}
        >
          {`${index + 1}: ${status.step}${
            status.progress > 0 ? ` ${status.progress.toFixed(0)}%` : ""
          }`}
        </div>
      );
    });
  };

  const url = () => {
    if (image.url) return image.url;
  };

  const onClick = () => {
    editContext.toggleSelectedBank(image.image_id);
  };

  const onDragStart = () => {};

  return (
    <div
      className={`upload-item ${image.complete ? "complete" : ""} ${
        image.selected ? "selected" : ""
      } ${image.error ? "error" : ""}`}
      style={{ backgroundImage: `url(${url()})` }}
      draggable
      onClick={onClick}
      onDragStart={() => editContext.toggleSelectedBank(image.image_id, true)}
    >
      <div className={`status ${image.complete ? "complete" : ""}`}>
        {renderStatus()}
      </div>
    </div>
  );
};

export default ImageUploadCard;
