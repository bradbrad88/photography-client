import React from "react";
import "../../stylesheets/Main.css";

const Confirm = ({ message, handleConfirm, display }) => {
  return (
    <div
      className={"background-box"}
      style={{ display: `${display ? "flex" : "none"}` }}
    >
      <div className={"confirmation-box"}>
        <p>{message}</p>
        <button>Cancel</button>
        <button>Confirm</button>
      </div>
    </div>
  );
};

export default Confirm;
