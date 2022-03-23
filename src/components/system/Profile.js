import React, { useContext } from "react";
import UserContext from "contexts/UserContext";
import Logout from "../auth/Logout";
import "stylesheets/NavBar.css";

const Profile = () => {
  const {
    profile: { id, familyName, givenName, imageUrl },
  } = useContext(UserContext);

  console.log("User Id:", id);
  return (
    (id && (
      <div className={"profile"}>
        {`Logged in as ${givenName} ${familyName}`}
        <img className="profile-image" src={imageUrl} />
        <Logout />
      </div>
    )) ||
    null
  );
};

export default Profile;
