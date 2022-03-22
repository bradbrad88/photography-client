import React, { useContext } from "react";
import { UserContext } from "contexts/UserContext";
import Logout from "../auth/Logout";
import "stylesheets/NavBar.css";

const Profile = () => {
  const userContext = useContext(UserContext);

  return (
    (userContext.profile && (
      <div className={"profile"}>
        {`Logged in as ${userContext.profile.given_name} ${userContext.profile.family_name}`}
        <img className="profile-image" src={userContext.profile.image_url} />
        <Logout />
      </div>
    )) ||
    null
  );
};

export default Profile;
