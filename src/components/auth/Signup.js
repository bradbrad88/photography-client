import React, { useState } from "react";

const Signup = () => {
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
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
      data.append("givenName", givenName);
      data.append("familyName", familyName);
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
        <label htmlFor="givenName">Given Name</label>
        <input
          id="givenName"
          type="text"
          autoComplete="given-name"
          value={givenName}
          onChange={e => setGivenName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="familyName">Family Name</label>
        <input
          id="familyName"
          type="text"
          autoComplete="family-name"
          value={familyName}
          onChange={e => setFamilyName(e.target.value)}
        />
      </div>
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
