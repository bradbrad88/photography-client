import { useEffect, useRef, useCallback } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import userContext from "contexts/UserContext";

const ELEMENT_ID = "google-gsi";
const ELEMENT_SRC = "https://accounts.google.com/gsi/client";
const PROVIDER = "https://accounts.google.com";

const useGoogle = () => {
  const nav = useNavigate();
  const { login } = userContext();
  const scriptRef = useRef<HTMLScriptElement>();
  const callback = useCallback(
    async (res: any) => {
      const options = {
        provider: "https://accounts.google.com",
        lookup: res.credential,
      };
      const { verify } = await login(options);
      if (verify) {
        const params = new URLSearchParams();
        const id: any = jwt.decode(res.credential);
        if (typeof id !== "object") return;
        params.append("provider", PROVIDER);
        params.append("providerUserId", id.sub);
        nav("/verify?" + params.toString());
      }
    },
    [login, nav]
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
      if (!googleElement) return;
      window.google.accounts.id.renderButton(googleElement, {
        theme: "outline",
        size: "large",
        width: 240,
        logo_alignment: "left",
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
