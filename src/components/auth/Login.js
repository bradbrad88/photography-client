import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import GoogleContext from "../contexts/GoogleContext";
import UserContext from "../contexts/UserContext";
// import { refreshTokenSetup } from "../../utils/refreshToken";
import "../../stylesheets/Auth.css";
const Login = ({ msg }) => {
  const googleContext = useContext(GoogleContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (userContext.profile) {
      history.push("/");
    }
  }, [userContext]);
  const onLoginGoogle = () => {
    googleContext.onSignin();
  };

  return (
    <div className="container">
      <div className="text-container">{msg}</div>
      <button className="auth facebook">Login with Facebook</button>
      <button className="auth google" onClick={onLoginGoogle}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
