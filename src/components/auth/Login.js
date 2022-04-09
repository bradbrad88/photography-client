import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import GoogleContext from "contexts/GoogleContext";
import UserContext from "contexts/UserContext";
// import { refreshTokenSetup } from "../../utils/refreshToken";
import "stylesheets/Auth.scss";
import LocalLogin from "./LocalLogin";
import Signup from "./Signup";

const Login = ({ msg }) => {
  const [local, setLocal] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const { profile } = useContext(UserContext);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = "google-gsi";
    document.body.appendChild(script);
    script.onload = () => {
      setGoogleLoaded(true);
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-sign-in"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };
  }, []);

  const handleGoogleLogin = async res => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const params = new URLSearchParams();
    params.append("token", res.credential);
    const body = params.toString();
    try {
      const options = {
        headers,
        body,
        method: "POST",
        credentials: "include",
      };
      const result = await fetch(
        process.env.REACT_APP_SERVER_API + "/auth/google",
        options
      );
      const userData = await result.json();
      console.log(userData);
      // Send userData to context
    } catch (error) {
      console.error(error);
    }
  };

  const loadGoogleButton = useMemo(() => {
    if (!googleLoaded) return null;
    return <div id="google-sign-in" className="auth google"></div>;
  }, [googleLoaded]);

  return (
    <div className="container">
      <div className="text-container">{msg}</div>
      <button className="auth local" onClick={() => setLocal(true)}>
        Login with Email
      </button>
      {local && <LocalLogin />}
      {local && <Signup />}
      <button className="auth facebook">Login with Facebook</button>
      {googleLoaded && loadGoogleButton}
    </div>
  );
};

export default Login;
