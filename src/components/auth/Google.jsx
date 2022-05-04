import { useEffect, useRef, useCallback } from "react";
import userContext from "contexts/UserContext";

const ELEMENT_ID = "google-gsi";
const ELEMENT_SRC = "https://accounts.google.com/gsi/client";

const useGoogle = () => {
  const { login } = userContext();
  const scriptRef = useRef(null);
  const callback = useCallback(
    res => {
      const options = {
        provider: "https://accounts.google.com",
        lookup: res.credential,
      };
      login(options);
    },
    [login]
  );

  useEffect(() => {
    scriptRef.current = document.createElement("script");
    const script = scriptRef.current;
    script.src = ELEMENT_SRC;
    script.id = ELEMENT_ID;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: callback,
      });
      const googleElement = document.getElementById("google-sign-in");
      window.google.accounts.id.renderButton(googleElement, {
        theme: "outline",
        size: "large",
      });
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [callback]);

  return <div id="google-sign-in" className="auth google"></div>;
};

export default useGoogle;
