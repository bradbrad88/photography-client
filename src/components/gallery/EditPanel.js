import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DragAndDrop from "./DragAndDrop";
import "../../stylesheets/GalleryEdit.css";
import ImageBank from "./ImageBank";
import EditContext from "../contexts/GalleryEditContext";

const EditPanel = () => {
  const editContext = useContext(EditContext);

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files = files.map(file => {
      return {
        image_id: null,
        date_uploaded: Date.now(),
        url: null,
        image_desc: "",
        complete: false,
        upload: {
          key: uuidv4(),
          file: file,
          status: [],
          uploadTime: Date.now(),
        },
      };
    });

    files = files.filter(file => {
      return (
        file.upload.file.type === "image/jpeg" ||
        file.upload.file.type === "image/png"
      );
    });
    editContext.newUploads(files);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  return (
    <div className="edit-panel" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="upload">
        <DragAndDrop />
      </div>
      <ImageBank />
    </div>
  );
};

export default EditPanel;
