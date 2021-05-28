import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../../stylesheets/DragAndDrop.css";

const DragAndDrop = props => {
  const { data, dispatch } = props;

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    // dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
    // console.log("dropDepth: ", data.dropDepth);
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    // dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    // console.log("dropDepth: ", data.dropDepth);
    // if (data.dropDepth > 0) return;
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files = files.map(file => {
      return {
        key: uuidv4(),
        data: { file: file, base64: null },
        status: [],
        uploadReady: false,
        uploadTime: Date.now(),
        complete: false,
        uploading: false,
        objectUrl: URL.createObjectURL(file),
      };
    });
    // if (files && files.length > 0) {
    //   const existingFiles = data.fileList.map((f) => f.name);
    //   files = files.filter((f) => !existingFiles.includes(f.name));
    files = files.filter(file => {
      return (
        file.data.file.type === "image/jpeg" || file.data.file.type === "image/png"
      );
    });
    files.forEach(file => {
      dispatch({ type: "ADD_FILE_TO_LIST", file });
    });
    files.forEach(async file => {
      let image = {
        base64: await getBase64(file.data.file),
        key: file.key,
      };
      dispatch({ type: "ADD_BASE64", image });
    });
    //   dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
    //   dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    // }
  };

  return (
    <div
      className={
        data.inDropZone ? "drag-drop-zone inside-drag-area" : "drag-drop-zone"
      }
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
