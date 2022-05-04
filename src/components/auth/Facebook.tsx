import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "contexts/UserContext";
import Button from "components/elements/Button";

const PROVIDER = "https://graph.facebook.com";
const ELEMENT_SRC = "https://connect.facebook.net/en_US/sdk.js";
const ELEMENT_ID = "facebook-sdk";

declare global {
  interface Window {
    FB: fb.FacebookStatic | undefined;
  }
}

const Facebook = () => {
  const nav = useNavigate();
  const { login } = userContext();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [continueAs, setContinueAs] = useState("");
  const mounted = useRef(false);

  const loadSdk = useCallback(() => {
    const script = document.createElement("script");
    script.id = ELEMENT_ID;
    script.src = ELEMENT_SRC;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.async = true;
    fbAsyncInit();
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!document.getElementById(ELEMENT_ID)) {
      setSdkLoaded(false);
      loadSdk();
    } else {
      if (!sdkLoaded) setSdkLoaded(true);
    }
    return () => {
      mounted.current = false;
    };
  }, [loadSdk, sdkLoaded]);

  useEffect(() => {
    if (sdkLoaded) {
      window.FB?.getLoginStatus(async res => {
        const { authResponse } = res;
        if (!authResponse) return;
        const params = new URLSearchParams();
        params.append("access_token", authResponse.accessToken);
        const url: RequestInfo = new URL(
          "/v13.0/me?" + params.toString(),
          PROVIDER
        ).toString();
        const response = await fetch(url);
        const { name } = await response.json();
        if (name && mounted.current) setContinueAs(name);
      }, true);
    }
  }, [sdkLoaded]);

  function fbAsyncInit() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
        version: "v13.0",
      });

      if (mounted.current) setSdkLoaded(true);
    };
  }

  const handleLogin = async () => {
    let authResponse: fb.AuthResponse | null;
    if (!window.FB) return console.error("FB module not loaded");
    authResponse = window.FB.getAuthResponse();
    if (!authResponse) {
      window.FB.login(
        response => {
          authResponse = response.authResponse;
        },
        { scope: "email", return_scopes: true }
      );
    }
    if (!authResponse) return;
    const options = {
      provider: PROVIDER,
      lookup: authResponse.accessToken,
    };
    const { verify } = await login(options);
    if (verify) {
      const params = new URLSearchParams();
      params.append("provider", PROVIDER);
      params.append("providerUserId", authResponse.userID);
      nav("/verify?" + params.toString());
    }
  };

  return (
    <Button
      text={continueAs ? "Continue as " + continueAs : "Sign in with Facebook"}
      className="facebook auth"
      onClick={handleLogin}
      img={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png"}
    />
  );
};

export default Facebook;
