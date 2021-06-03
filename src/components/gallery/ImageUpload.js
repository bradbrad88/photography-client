import React, { useReducer } from "react";
import DragAndDrop from "./DragAndDrop";
import "../../stylesheets/DragAndDrop.css";
import ImageUploadCard from "./ImageUploadCard";

const ImageUpload = () => {
  let ws = null;
  const reducer = (state, action) => {
    let index;
    let fileList = [];
    switch (action.type) {
      // case "SET_DROP_DEPTH":
      //   return { ...state, dropDepth: action.dropDepth };

      case "ADD_BASE64":
        fileList = [...state.fileList];
        index = fileList.findIndex(file => file.key === action.image.key);
        fileList[index].data.base64 = action.image.base64;
        fileList[index].uploadReady = true;
        return { ...state, fileList: fileList };
      case "UPLOADING":
        index = state.fileList.findIndex(file => file.key === action.key);
        fileList = [...state.fileList];
        fileList[index].data.base64 = null;
        fileList[index].uploading = true;
        fileList[index].uploadReady = false;
        return { ...state, fileList: fileList };
      case "SET_IN_DROP_ZONE":
        if (state.inDropZone === action.inDropZone) return state;
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.file) };
      case "DELETE_UPLOAD":
        const filterList = state.fileList.filter(file => {
          return file.key !== action.key;
        });
        return { ...state, fileList: filterList };
      case "INCOMING_MESSAGE":
        console.log("message:", action.message);
        index = state.fileList.findIndex(file => file.key === action.message.key);
        fileList = [...state.fileList];
        fileList[index].status = action.message.status;
        console.log(fileList[index]);
        if (action.message.complete || action.message.error) {
          fileList[index].complete = true;
          fileList[index].uploading = false;
        }

        return {
          ...state,
          fileList: fileList,
        };
      default:
        return state;
    }
  };
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  const wsOpen = event => {
    data.fileList
      .filter(image => {
        return image.uploadReady;
      })
      .forEach(img => {
        const request = JSON.stringify({
          data: img.data.base64,
          key: img.key,
          type: img.data.file.type,
          description: "",
        });
        ws.send(request);
        dispatch({ type: "UPLOADING", key: img.key });
      });
  };

  const wsMessage = event => {
    const imageStatus = JSON.parse(event.data);
    dispatch({ type: "INCOMING_MESSAGE", message: imageStatus });
    if (data.fileList.filter(file => file.complete === false).length === 0)
      ws.close();
  };

  const onClick = async () => {
    if (data.fileList.length < 1) return;
    if (ws) {
      ws.close();
    }
    ws = new WebSocket("ws://localhost:3001");
    ws.onopen = wsOpen;
    ws.onmessage = wsMessage;
  };

  const uploadButton = () => {
    const disabled =
      data.fileList.filter(file => {
        return file.uploadReady;
      }).length < 1;
    return (
      <button className="button upload" onClick={onClick} disabled={disabled}>
        Upload
      </button>
    );
  };

  const uploadCards = () => {
    return data.fileList
      .sort((a, b) => {
        return a.uploadTime - b.uploadTime;
      })
      .map(file => {
        return <ImageUploadCard key={file.key} image={file} dispatch={dispatch} />;
      });
  };

  return (
    <div className="upload">
      <DragAndDrop data={data} dispatch={dispatch} />
      {uploadButton()}
      <div className="dropped-files">{uploadCards()}</div>
    </div>
  );
};

export default ImageUpload;
