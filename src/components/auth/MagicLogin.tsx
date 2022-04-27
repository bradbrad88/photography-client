import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ripple } from "react-spinners-css";
import Button from "components/elements/Button";

const MagicLogin = () => {
  const nav = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [working, setWorking] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
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
      setEmailSent(true);
    } catch (error) {
      setWorking(false);
    }
  };

  const onBack = () => {
    nav("/");
  };

  return (
    <div className="magic-login">
      <Button onClick={onBack} back={true} />
      {emailSent ? (
        <div className="email-sent">
          <h2>Email Sent</h2>
          <p className="email">{email}</p>
          <p>Please check your inbox and click the link provided to login</p>
          <p>
            Allow a minute for the email to appear and ensure the address you provided is spelt
            correctly
          </p>
          <p>
            <span className="resend" onClick={onSubmit}>
              Resend Email
            </span>
          </p>
          {working && <Ripple />}
        </div>
      ) : (
        <form className="form">
          <h2>Email Link To Login</h2>
          <p>Enter your email address and a link will be sent to log you in</p>
          <div className="field">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={onSubmit} text={"Send Link"} working={working} />
        </form>
      )}
    </div>
  );
};

export default MagicLogin;
