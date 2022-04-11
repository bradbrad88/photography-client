import { useState, useEffect, useCallback, useRef } from "react";

const ELEMENT_ID = "google-gsi";
const ELEMENT_SRC = "https://accounts.google.com/gsi/client";

const useGoogle = callback => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const scriptRef = useRef(null);

  const retry = useCallback(() => {
    console.log("RUNNING USECALLBACK");
    scriptRef.current = document.createElement("script");
    const script = scriptRef.current;
    script.src = ELEMENT_SRC;
    script.id = ELEMENT_ID;
    script.onload = () => {
      console.log("SCRIPT LOADED EVENT");
      setLoading(false);
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: callback,
      });
      const googleElement = document.getElementById("google-sign-in");
      console.log("Google element", googleElement);
      window.google.accounts.id.renderButton(googleElement, {
        theme: "outline",
        size: "large",
      });
      setSuccess(true);
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
      // const element = document.getElementById(ELEMENT_ID);
      // document.body.removeChild(element);
    };
  }, [callback]);

  useEffect(() => {
    console.log("RUNNING USE EFFECT USE_GOOGLE");
    return retry();
  }, [retry]);

  return { success, loading, retry };
};

export default useGoogle;
