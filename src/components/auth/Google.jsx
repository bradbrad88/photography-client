import { useEffect, useContext, useRef } from "react";
import UserContext from "contexts/UserContext";

const ELEMENT_ID = "google-gsi";
const ELEMENT_SRC = "https://accounts.google.com/gsi/client";

const useGoogle = () => {
  const { login } = useContext(UserContext);
  const scriptRef = useRef(null);

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
  }, []);

  const callback = res => {
    const options = {
      provider: "https://accounts.google.com",
      lookup: res.credential,
    };
    login(options);
  };

  return <div id="google-sign-in" className="auth google"></div>;
};

export default useGoogle;
