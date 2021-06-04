import React from "react";
import "../../stylesheets/ImageGallery.css";

const EditFeatures = props => {
  // const onDelete = () => {};
  // const onEmphasize = () => {};
  return (
    <div>
      <button className={"gallery delete"} onClick={props.onDelete}>
        Delete
      </button>
      <button className={"gallery emphasize"} onClick={props.onEmphasize}>
        Emphasize
      </button>
      <button className={"gallery emphasize"} onClick={props.onGroupSelect}>
        Select all
      </button>
    </div>
  );
};
export default EditFeatures;
