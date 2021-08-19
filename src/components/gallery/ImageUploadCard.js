import React, { useContext, useEffect } from "react";
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

  const onClick = () => {
    editContext.toggleSelectedBank(image.image_id);
  };

  const onDragStart = e => {
    e.dataTransfer.setData("text/plain", "");
    e.dataTransfer.setData("image-id", image.image_id);
    editContext.deselectAllBank();
    editContext.setDragging(true);
    // editContext.toggleSelectedBank(image.image_id, true);
  };

  const onDragEnd = e => {
    editContext.setDragging(false);
  };

  return (
    <div
      key={image.image_id}
      className={`upload-item ${image.complete ? "complete" : ""} ${
        image.selected ? "selected" : ""
      } ${image.error ? "error" : ""}`}
      style={{ backgroundImage: `url(${image.thumbnail})` }}
      draggable
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      ondra
    >
      <div className={`status ${image.complete ? "complete" : ""}`}>
        {renderStatus()}
      </div>
    </div>
  );
};

export default ImageUploadCard;
