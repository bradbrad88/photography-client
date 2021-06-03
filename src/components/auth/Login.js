import React, { useContext } from "react";
import GoogleContext from "../contexts/GoogleContext";
import UserContext from "../contexts/UserContext";
import { refreshTokenSetup } from "../../utils/refreshToken";
import "../../stylesheets/Auth.css";
const Login = () => {
  const googleContext = useContext(GoogleContext);

  const onLoginGoogle = () => {
    googleContext.onSignin();
  };

  return (
    <div className="container">
      <div className="text-container">Choose your login method</div>
      <button className="auth facebook">Login with Facebook</button>
      <button className="auth google" onClick={onLoginGoogle}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
