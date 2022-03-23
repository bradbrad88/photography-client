import React, { useContext } from "react";
// import GoogleContext from "contexts/GoogleContext";
import UserContext from "contexts/UserContext";
import "stylesheets/NavBar.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Logout = () => {
  const { logout } = useContext(UserContext);
  const onClick = () => {
    logout();
  };
  return (
    <>
      <button className={"logout"} onClick={onClick}>
        Logout
      </button>
    </>
  );
};
export default Logout;
