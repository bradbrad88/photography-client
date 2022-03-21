import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [vpw, setVpw] = useState("");
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const data = new URLSearchParams();
      data.append("email", email);
      data.append("password", pw);
      const body = data.toString();

      const options = {
        method: "POST",
        body,
        headers,
      };
      const res = await fetch(
        process.env.REACT_APP_SERVER_API + "/signup/local",
        options
      );
      console.log(res);
    } catch (error) {}
  };

  return (
    <form className="form" onSubmit={onSubmit} autoComplete="on">
      <h1>Sign Up</h1>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
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
        <label htmlFor="vpw">Confirm Password</label>
        <input
          id="vpw"
          type="password"
          value={vpw}
          onChange={e => setVpw(e.target.value)}
        />
      </div>
      <div className="field">
        <input type={"submit"} value={"Sign Up"} />
      </div>
    </form>
  );
};

export default Signup;
