import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GoogleContext from "contexts/GoogleContext";
import UserContext from "contexts/UserContext";
// import { refreshTokenSetup } from "../../utils/refreshToken";
import "../../stylesheets/Auth.scss";
import LocalLogin from "./LocalLogin";
import Signup from "./Signup";

const Login = ({ msg }) => {
  const [local, setLocal] = useState(false);
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
      <button className="auth local" onClick={() => setLocal(true)}>
        Login with Email
      </button>
      {local && <LocalLogin />}
      {local && <Signup />}
      <button className="auth facebook">Login with Facebook</button>
      <button
        className="auth google"
        disabled={googleContext.auth ? false : true}
        onClick={onLoginGoogle}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
