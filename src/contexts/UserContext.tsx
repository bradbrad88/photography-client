import { useAuth, VerifyCodeOptions, ProfileReturn, profileReturn } from "hooks/useAuth";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createCtx } from "./utils";

export interface ProfileData {
  id: string;
  givenName: string;
  familyName: string;
  email: string;
  imageUrl: string;
  verified?: boolean;
}

interface LoginOptions {
  provider: string;
  lookup: string;
}

interface PropTypes {
  children: any;
}

interface AjaxSuccess {
  success: boolean;
  error?: any;
}

interface UserCtx {
  profile: ProfileData | null;
  working: boolean;
  isLoggedIn: () => {};
  checkActiveSession: () => {};
  login: (options: LoginOptions) => Promise<ProfileReturn>;
  logout: () => void;
  setProfile: (data: ProfileData) => void;
  verifyCode: (options: VerifyCodeOptions) => Promise<AjaxSuccess>;
}

const [useCtx, Provider] = createCtx<UserCtx>();

const UserProvider = ({ children }: PropTypes) => {
  const nav = useNavigate();
  const [profile, setProfileState] = useState<ProfileData | null>(null);
  const { loginVerifyCode, loginOauth, getSessionProfile, working } = useAuth();

  const isLoggedIn = useCallback(() => {
    return profile?.id ? true : false;
  }, [profile]);

  const checkActiveSession = useCallback(async () => {
    const { user, error } = await getSessionProfile();
    if (error) {
      console.error(error);
      setProfileState(null);
    }
    if (!user) return setProfileState(null);
    setProfile(user);
  }, [getSessionProfile]);

  useEffect(() => {
    checkActiveSession();
  }, [checkActiveSession]);

  const login = async (options: LoginOptions) => {
    const { provider, lookup } = options;
    let data: ProfileReturn;
    switch (provider) {
      case "https://accounts.google.com":
        data = await loginOauth("google", lookup);
        break;
      case "https://graph.facebook.com":
        data = await loginOauth("facebook", lookup);
        break;
      default:
        data = profileReturn("Invalid provider option");
        break;
    }
    setProfile(data.user);
    return profileReturn(data.error, data.user, data.verify);
  };

  const logout = () => {
    setProfileState(null);
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
    };
    fetch(process.env.REACT_APP_SERVER_API + "/logout", options);
    nav("/");
  };

  const setProfile = (data: ProfileData | null) => {
    if (typeof data !== "object") return setProfileState(null);
    if (!data) return setProfileState(null);
    const { id, givenName, familyName, email, imageUrl, verified } = data;
    setProfileState({ id, givenName, familyName, email, imageUrl, verified });
  };

  const verifyCode = async (options: VerifyCodeOptions) => {
    const { user, error } = await loginVerifyCode(options);
    if (error) {
      console.error(error);
      return { success: false, error } as AjaxSuccess;
    }
    if (!user) return { success: false } as AjaxSuccess;
    setProfile(user);
    return { success: true } as AjaxSuccess;
  };

  return (
    <Provider
      value={{
        profile,
        working,
        isLoggedIn,
        checkActiveSession,
        login,
        logout,
        setProfile,
        verifyCode,
      }}
    >
      {children}
    </Provider>
  );
};

export default useCtx;

export { UserProvider };
