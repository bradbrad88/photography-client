import React, { useState, useContext } from "react";
import UserContext from "contexts/UserContext";

const LocalLogin = () => {
  const { setProfile } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const data = new URLSearchParams();
      data.append("username", email);
      data.append("password", pw);
      const body = data.toString();
      const options = {
        method: "POST",
        credentials: "include",
        body,
        headers,
      };
      const res = await fetch(
        process.env.REACT_APP_SERVER_API + "/login/local",
        options
      );
      const { user } = await res.json();
      console.log(user);
      setProfile(user);
    } catch (error) {}
  };
  const test = async e => {
    e.preventDefault();
    try {
      const options = {
        credentials: "include",
      };
      const res = await fetch(process.env.REACT_APP_SERVER_API + "/test", options);
      const data = await res.json();
      console.log(res);
    } catch (error) {}
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1>Login</h1>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="pw">Password</label>
        <input
          id="pw"
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />
      </div>
      <div className="field">
        <input type={"submit"} value={"Login"} />
      </div>
      <button onClick={test}>Test</button>
    </form>
  );
};

export default LocalLogin;
