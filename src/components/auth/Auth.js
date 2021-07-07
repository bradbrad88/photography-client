import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Auth = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();
  if (!userContext.isAdmin) {
    if (history.length <= 2) {
      history.replace("/");
    } else {
      history.goBack();
    }
  }
  return null;
};

export default Auth;
