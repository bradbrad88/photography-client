import React from "react";
import DragAndDrop from "./DragAndDrop";
import "../../stylesheets/GalleryEdit.css";
import ImageBank from "./ImageBank";

const EditPanel = () => {
  return (
    <div className="edit-panel">
      <div className="upload">
        <DragAndDrop />
      </div>
      <ImageBank />
    </div>
  );
};

export default EditPanel;
