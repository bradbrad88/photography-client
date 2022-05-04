import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Ripple } from "react-spinners-css";
import userContext from "contexts/UserContext";
import Button from "components/elements/Button";

const Verify = () => {
  const nav = useNavigate();
  const { verifyCode } = userContext();
  const [params] = useSearchParams();
  const [code, setCode] = useState("");
  const [gettingNewCode, setGettingNewCode] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const providerUserId = params.get("providerUserId") || "";
  const provider = params.get("provider") || "";

  const onClick = async () => {
    setFailMsg("");
    const { success, error } = await verifyCode({ code, provider, providerUserId });
    if (error) {
      setFailMsg("An error occurred, please try again soon");
    }
    if (!success) {
      setFailMsg("The code you entered is either invalid or has expired");
    } else {
      nav("/");
    }
  };
  const onBack = () => {
    nav("/");
  };
  const onNewCode = async () => {
    if (gettingNewCode) return;
    try {
      setGettingNewCode(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const bodyObj = {
        provider,
        providerUserId,
      };
      const body = JSON.stringify(bodyObj);
      const options: RequestInit = {
        headers,
        body,
        method: "POST",
      };
      await fetch(process.env.REACT_APP_SERVER_API + "/new-code", options);
      setGettingNewCode(false);
    } catch (error) {
      setGettingNewCode(false);
    }
  };
  return (
    <div className="frame">
      <div className="verify">
        <h2>Verification Code</h2>
        <p style={{ textAlign: "center", fontSize: "1.2em" }}>
          Check your emails for a code.
          <br /> The email should arrive very shortly. Please be sure to check if it went to
          your junk mail. If you request another email, the code will change. Only the latest
          code will work.
        </p>
        <div className="input">
          <label>Input Code Here:</label>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            type="text"
            maxLength={6}
          />
          <span onClick={onNewCode} className="new-code link">
            {gettingNewCode ? <Ripple size={20} color="black" /> : "Request New Code"}
          </span>
          <span className="err-msg">{failMsg}</span>
        </div>
        <Button text="submit" onClick={onClick} />
      </div>
      <Button back={true} onClick={onBack} />
    </div>
  );
};

export default Verify;
