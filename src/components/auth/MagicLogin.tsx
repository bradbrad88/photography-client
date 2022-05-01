import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Ripple } from "react-spinners-css";
import Button from "components/elements/Button";

const MagicLogin = () => {
  const nav = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [working, setWorking] = useState(false);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [valid, setValid] = useState(false);
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!valid) {
      setErrMsg("Please check the email address you supplied");
      return;
    }
    try {
      setWorking(true);
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const data = new URLSearchParams();
      data.append("email", email);
      const body = data.toString();
      const options: RequestInit = {
        method: "POST",
        credentials: "include",
        body,
        headers,
      };
      const res = await fetch(process.env.REACT_APP_SERVER_API + "/magic-link", options);
      const { success } = await res.json();
      setWorking(false);
      if (success) {
        setEmailSent(true);
      } else {
        // Apply error message to let user know service is down
        setErrMsg(
          "There is an error on our side - sorry for the inconvenience. Please try again soon."
        );
      }
    } catch (error) {
      setErrMsg(
        "The system seems to be down - sorry for the inconvenience. Please try again soon."
      );
      setWorking(false);
    }
  };

  const onBack = () => {
    nav("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    setValid(e.target.checkValidity());
    setEmail(e.target.value);
  };

  return (
    <div className="frame">
      <div className="magic-login">
        {emailSent ? (
          <div className="email-sent">
            <h2>Email Sent</h2>
            <p className="email">{email}</p>
            <p>Please check your inbox and click the link provided to login</p>
            <p>
              Allow a minute for the email to appear and ensure the address you provided is
              spelt correctly
            </p>
            <p>
              <span className="link" onClick={onSubmit}>
                Resend Email
              </span>
            </p>
            {working && <Ripple />}
          </div>
        ) : (
          <form className="form" autoComplete="on">
            <h2>Email Link To Login</h2>
            <p>
              Enter your email address and you will be sent a link that you can log in with
            </p>
            <section className="field">
              <label htmlFor="email">Email</label>
              <input
                ref={ref}
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
              />
            </section>
            <Button onClick={onSubmit} text={"Send Link"} working={working} />
            <p className="err-msg">{errMsg}</p>
          </form>
        )}
      </div>
      <Button onClick={onBack} back={true} />
    </div>
  );
};

export default MagicLogin;
