import { useCallback } from "react";

export const useAuth = () => {
  const loginOauth = useCallback(async (provider, token) => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const data = new URLSearchParams();
      data.append("token", token);
      const body = data.toString();
      const options = {
        method: "POST",
        body,
        headers,
        credentials: "include",
      };
      const res = await fetch(
        process.env.REACT_APP_SERVER_API + `/auth/${provider}`,
        options
      );
      const user = await res.json();
      return { user };
    } catch (error) {
      return { error };
    }
  }, []);

  const getSessionProfile = useCallback(async () => {
    try {
      const options = {
        credentials: "include",
      };
      const res = await fetch(
        process.env.REACT_APP_SERVER_API + "/auth/session",
        options
      );
      const user = await res.json();
      return { user };
    } catch (error) {
      return { error };
    }
  }, []);
  return { loginOauth, getSessionProfile };
};
