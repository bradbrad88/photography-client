import userContext from "contexts/UserContext";
import Logout from "components/auth/Logout";

const Profile = () => {
  const { profile } = userContext();
  return (
    <div className="profile">
      <h2>Profile Details</h2>
      <p>Name:{profile?.givenName + " " + profile?.familyName}</p>
      <Logout />
    </div>
  );
};

export default Profile;
