import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
const Context = React.createContext();

const UserProvider = ({ children }) => {
  const [profile, setProfileState] = useState({});
  const { loginGoogle, isLoggedIn: _isLoggedIn } = useAuth();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const setProfile = data => {
    const { id, givenName, familyName, email, imageUrl } = data;
    setProfileState({ id, givenName, familyName, email, imageUrl });
  };

  const logout = () => {
    setProfileState({});
    const options = {
      method: "POST",
      credentials: "include",
    };
    fetch(process.env.REACT_APP_SERVER_API + "/logout", options);
  };

  const checkLoginStatus = async () => {
    const { user, error } = await _isLoggedIn();
    if (error) {
      console.error(error);
      setProfileState({});
    }
    if (!user) return setProfileState({});
    setProfile(user);
  };

  const login = async options => {
    const { provider, lookup } = options;
    switch (provider) {
      case "https://accounts.google.com":
        const { user } = await loginGoogle(lookup);
        console.log(user);
        return setProfile(user);
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
