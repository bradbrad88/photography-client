import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import EditContext from "../contexts/GalleryEditContext";
import "../../stylesheets/GalleryEdit.css";

const DragAndDrop = props => {
  const editContext = useContext(EditContext);
  const [inDropZone, setInDropZone] = useState(false);

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZone(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = e => {
    // e.preventDefault();
    // e.stopPropagation();
    // let files = [...e.dataTransfer.files];
    // files = files.map(file => {
    //   return {
    //     image_id: null,
    //     date_uploaded: Date.now(),
    //     url: null,
    //     image_desc: "",
    //     complete: false,
    //     upload: {
    //       key: uuidv4(),
    //       file: file,
    //       status: [],
    //       uploadTime: Date.now(),
    //     },
    //   };
    // });
    // files = files.filter(file => {
    //   return (
    //     file.upload.file.type === "image/jpeg" ||
    //     file.upload.file.type === "image/png"
    //   );
    // });
    // editContext.newUploads(files);
    // setInDropZone(false);
  };

  return (
    <div
      className={`drag-drop-zone ${inDropZone ? "inside-drag-area" : ""}`}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
    >
      <p>
        Drag files here to upload
        <br />
        PNG or JPEG accepted
      </p>
    </div>
  );
};

export default DragAndDrop;
