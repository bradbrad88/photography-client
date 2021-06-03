import React from "react";
import "../../stylesheets/DragAndDrop.css";

const ImageUploadCard = ({ image, dispatch }) => {
  const renderStatus = () => {
    // console.log(image);
    return image.status.map((status, index) => {
      return (
        <div
          key={status.step}
          className={`status ${status.inProgress ? "in-progress" : ""} ${
            status.complete ? "complete" : ""
          }`}
        >
          {`${index + 1}: ${status.step}${
            status.progress > 0 ? ` ${status.progress.toFixed(0)}%` : ""
          }`}
        </div>
      );
    });
  };
  const deleteButtonHandler = () => {
    dispatch({ type: "DELETE_UPLOAD", key: image.key });
  };
  return (
    <div>
      <div
        className={`upload-item ${image.complete ? "complete" : ""}`}
        style={{ backgroundImage: `url(${image.objectUrl})` }}
      >
        {renderStatus()}
        {!image.uploading && !image.complete && (
          <button onClick={deleteButtonHandler}>X</button>
        )}
      </div>
      {/* <div className="upload-text">{image.data.file.name}</div> */}
    </div>
  );
};

export default ImageUploadCard;
