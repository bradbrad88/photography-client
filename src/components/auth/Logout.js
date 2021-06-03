import React, { useContext } from "react";
import GoogleContext from "../contexts/GoogleContext";
import "../../stylesheets/NavBar.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Logout = () => {
  const googleStore = useContext(GoogleContext);
  const onClick = () => {
    googleStore.onSignout();
  };
  return (
    <div className={"logout"}>
      <button className={"logout"} onClick={onClick}>
        Logout
      </button>
    </div>
  );
};
export default Logout;
