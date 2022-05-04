import { useCallback, useState } from "react";
import { ProfileData } from "contexts/UserContext";

export interface VerifyCodeOptions {
  code: string;
  provider: string;
  providerUserId: string;
}

export interface ProfileReturn {
  user: ProfileData | null;
  verify: boolean;
  // Test
  error?: any;
}

export const profileReturn = (
  error: any,
  user: ProfileData | null = null,
  verify: boolean = false
): ProfileReturn => {
  if (error) return { error, user: null, verify: false };
  return { user, verify: verify ? true : false };
};

export const useAuth = () => {
  const [working, setWorking] = useState(false);
  const loginVerifyCode = useCallback(
    async (options: VerifyCodeOptions): Promise<ProfileReturn> => {
      const { code, provider, providerUserId } = options;
      setWorking(true);
      try {
        const bodyContent = {
          providerUserId,
          provider,
          code,
        };
        const body = JSON.stringify(bodyContent);
        const options: RequestInit = {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
        const res = await fetch(process.env.REACT_APP_SERVER_API + "/verify-code", options);
        if (res.status !== 200) return profileReturn(null, null);
        setWorking(false);
        const user = await res.json();
        return profileReturn(null, user);
      } catch (error) {
        setWorking(false);
        return profileReturn(error);
      }
    },
    []
  );
  const loginOauth = useCallback(
    async (provider: string, token: string): Promise<ProfileReturn> => {
      setWorking(true);
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        const data = new URLSearchParams();
        data.append("token", token);
        const body = data.toString();
        const options: RequestInit = {
          method: "POST",
          body,
          headers,
          credentials: "include",
        };
        const res = await fetch(
          process.env.REACT_APP_SERVER_API + `/auth/${provider}`,
          options
        );
        setWorking(false);
        if (res.status === 401) {
          return profileReturn(null, null, true);
        }
        const user = await res.json();
        return profileReturn(null, user);
      } catch (error) {
        setWorking(false);
        return profileReturn(error);
      }
    },
    []
  );

  const getSessionProfile = useCallback(async (): Promise<ProfileReturn> => {
    setWorking(true);
    try {
      const options: RequestInit = {
        credentials: "include",
      };
      const res = await fetch(process.env.REACT_APP_SERVER_API + "/auth/session", options);
      const user = await res.json();
      setWorking(false);
      return profileReturn(null, user);
    } catch (error) {
      setWorking(false);
      return profileReturn(error);
    }
  }, []);
  return { loginVerifyCode, loginOauth, getSessionProfile, working };
};
