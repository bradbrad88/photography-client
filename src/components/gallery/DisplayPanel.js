import React, { useContext } from "react";
import EditContext from "../contexts/GalleryEditContext";
import "../../stylesheets/ImageGallery.css";

const DisplayPanel = props => {
  const editContext = useContext(EditContext);
  const selectedImages = editContext.imageDisplay.filter(image => image.selected);
  const onEmphasizeUp = e => {
    e.stopPropagation();
    editContext.emphasize(1);
  };

  const onEmphasizeDown = e => {
    e.stopPropagation();
    editContext.emphasize(-1);
  };

  const onSelectAll = e => {
    e.stopPropagation();
    editContext.selectAllDisplay();
  };

  return (
    <div className={"display-panel"}>
      <p>
        {selectedImages.length} image{selectedImages.length === 1 ? "" : "s"}{" "}
        selected
      </p>
      <button
        className={"gallery delete"}
        onClick={editContext.removeSelectedDisplay}
      >
        Remove
      </button>
      <div>
        <button className={"gallery emphasize"} onClick={onEmphasizeDown}>
          ←
        </button>
        <span>Emphasize</span>
        <button className={"gallery emphasize"} onClick={onEmphasizeUp}>
          →
        </button>
      </div>
      <button className={"gallery select"} onClick={onSelectAll}>
        {selectedImages.length === editContext.imageDisplay.length
          ? "De-select"
          : "Select all"}
      </button>
      <button className={"gallery save"} onClick={editContext.saveDisplay}>
        Save
      </button>
    </div>
  );
};
export default DisplayPanel;
