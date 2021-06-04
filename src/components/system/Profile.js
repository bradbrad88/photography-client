import React, { useContext } from "react";
import UserStore from "../contexts/UserContext";
import Logout from "../auth/Logout";
import "../../stylesheets/NavBar.css";

const Profile = () => {
  const userContext = useContext(UserStore);

  return (
    userContext.profile && (
      <div className={"profile"}>
        {`Logged in as ${userContext.profile.givenName} ${userContext.profile.familyName}`}
        <img className="profile" src={userContext.profile.imageUrl} />
        <Logout />
      </div>
    )
  );
};

export default Profile;
