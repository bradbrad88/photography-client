import { useContext } from "react";
import UserContext from "contexts/UserContext";
import Logout from "components/auth/Logout";

const Profile = () => {
  const { profile } = useContext(UserContext);
  return (
    <div className="profile">
      <h2>Profile Details</h2>
      <p>Name:{profile.givenName + " " + profile.familyName}</p>
      <Logout />
    </div>
  );
};

export default Profile;
