import userContext from "contexts/UserContext";
import Button from "components/elements/Button";
import "stylesheets/System.scss";

const Logout = () => {
  const { logout } = userContext();
  const onClick = () => {
    logout();
  };
  return <Button className="logout" onClick={onClick} text="Logout" />;
};
export default Logout;
