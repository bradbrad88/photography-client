import { useAuth } from "hooks/useAuth";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
const Context = React.createContext();

const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [profile, setProfileState] = useState({});
  const { loginOauth, getSessionProfile } = useAuth();

  const checkLoginStatus = useCallback(async () => {
    const { user, error } = await getSessionProfile();
    if (error) {
      console.error(error);
      setProfileState({});
    }
    if (!user) return setProfileState({});
    setProfile(user);
  }, [getSessionProfile]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const setProfile = data => {
    if (typeof data !== "object") return setProfileState({});
    const { id, givenName, familyName, email, imageUrl, verified } = data;
    setProfileState({ id, givenName, familyName, email, imageUrl, verified });
  };

  const logout = () => {
    setProfileState({});
    const options = {
      method: "POST",
      credentials: "include",
    };
    fetch(process.env.REACT_APP_SERVER_API + "/logout", options);
    nav("/");
  };

  const login = async options => {
    const { provider, lookup } = options;
    let data;
    switch (provider) {
      case "https://accounts.google.com":
        data = await loginOauth("google", lookup);
        if (data.error) {
          setProfileState({});
          console.error(data.error);
        }
        return setProfile(data.user);
      case "https://graph.facebook.com":
        data = await loginOauth("facebook", lookup);
        if (data.error) {
          setProfileState({});
          console.error(data.error);
        }
        return setProfile(data.user);
      case "LOCAL":
        return;
      default:
        break;
    }
  };

  const isLoggedIn = () => {
    return profile.id ? true : false;
  };

  return (
    <Context.Provider value={{ setProfile, profile, logout, login, isLoggedIn }}>
      {children}
    </Context.Provider>
  );
};

export default Context;

export { UserProvider };
