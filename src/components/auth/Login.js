import React, { useState, useContext, useEffect, useMemo, useCallback } from "react";
import UserContext from "contexts/UserContext";
import LocalLogin from "./LocalLogin";
import Signup from "./Signup";
import "stylesheets/Auth.scss";
import useGoogle from "hooks/useGoogle";
import Google from "./Google";

const Login = ({ msg }) => {
  const [local, setLocal] = useState(false);
  const { login } = useContext(UserContext);
  const handleGoogleLogin = useCallback(
    async res => {
      const options = {
        provider: "https://accounts.google.com",
        lookup: res.credential,
      };
      login(options);
    },
    [login]
  );
  const { loading: googleLoading, success: googleSuccess } =
    useGoogle(handleGoogleLogin);

  return (
    <div className="container">
      <div className="text-container">{msg}</div>
      <button className="auth local" onClick={() => setLocal(true)}>
        Login with Email
      </button>
      {local && <LocalLogin />}
      {local && <Signup />}
      <Google />
      {/* <Facebook /> */}
    </div>
  );
};

export default Login;
