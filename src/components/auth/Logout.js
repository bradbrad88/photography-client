import React, { useContext } from "react";
import UserContext from "contexts/UserContext";
import "stylesheets/NavBar.css";

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
