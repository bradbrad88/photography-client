import { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "contexts/UserContext";
import Button from "components/elements/Button";

const PROVIDER = "https://graph.facebook.com";
const ELEMENT_SRC = "https://connect.facebook.net/en_US/sdk.js";
const ELEMENT_ID = "facebook-sdk";

const Facebook = () => {
  const { login } = useContext(UserContext);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [continueAs, setContinueAs] = useState("");

  const loadSdk = useCallback(() => {
    const script = document.createElement("script");
    script.id = ELEMENT_ID;
    script.src = ELEMENT_SRC;
    script.defer = true;
    script.crossorigin = "anonymous";
    fbAsyncInit();
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!document.getElementById(ELEMENT_ID)) {
      setSdkLoaded(false);
      loadSdk();
    }
  }, [loadSdk]);

  useEffect(() => {
    if (sdkLoaded) {
      window.FB.getLoginStatus(async res => {
        console.log(res);
        if (!res.authResponse) return;
        const { authResponse } = res;
        const params = new URLSearchParams();
        params.append("access_token", authResponse.accessToken);
        const url = new URL("/v13.0/me?" + params.toString(), PROVIDER);
        const response = await fetch(url);
        const { name } = await response.json();
        if (name) setContinueAs(name);
      });
    }
  }, [sdkLoaded]);

  function fbAsyncInit() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
        version: "v13.0",
        status: true,
      });
      setSdkLoaded(true);
    };
  }

  // function loadSdk() {

  // }

  const onClick = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          const options = {
            provider: PROVIDER,
            lookup: response.authResponse.accessToken,
          };
          login(options);
        }
      },
      { scope: "email", return_scopes: true }
    );
  };

  return (
    <>
      {/* <button className="facebook auth" onClick={onClick}>
        <img
          className="icon"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png"
          alt=""
        />
        <span className="text">
          {continueAs ? "Continue as " + continueAs : "Sign in with Facebook"}
        </span>
      </button> */}
      <Button
        text={continueAs ? "Continue as " + continueAs : "Sign in with Facebook"}
        className="facebook auth"
        onClick={onClick}
        img={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png"}
      />

      <div
        className="fb-login-button"
        data-width="200px"
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div>
    </>
  );
};

export default Facebook;
