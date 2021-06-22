import React, { useContext } from "react";
import EditContext from "../contexts/GalleryEditContext";
import "../../stylesheets/ImageGallery.css";

const DisplayPanel = props => {
  const editContext = useContext(EditContext);
  return (
    <div className={"display-panel"}>
      <button className={"gallery delete"} onClick={props.onDelete}>
        Delete
      </button>
      <button className={"gallery emphasize"} onClick={props.onEmphasize}>
        Emphasize
      </button>
      <button className={"gallery emphasize"} onClick={props.onGroupSelect}>
        Select all
      </button>
      <button className={"gallery save"} onClick={editContext.saveDisplay}>
        Save
      </button>
    </div>
  );
};
export default DisplayPanel;
