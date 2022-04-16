export const useAuth = () => {
  const loginOauth = async (provider, token) => {
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
  };
  // const loginFacebook = async token => {
  //   try {
  //     const headers = new Headers()
  //     headers.append("Content-Type", "application/x-www-form-urlencoded")
  //   } catch (error) {

  //   }
  // }
  const isLoggedIn = async () => {
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
  };
  return { loginOauth, isLoggedIn };
};
