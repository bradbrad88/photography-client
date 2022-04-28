import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "components/elements/Button";

const Verify = () => {
  const [params] = useSearchParams();
  const [code, setCode] = useState("");
  const email = params.get("email");
  const provider = params.get("provider");

  const onClick = async () => {
    try {
      // Move this to UserContex.login
      const bodyContent = {
        email,
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
      const res = await fetch(process.env.REACT_APP_SERVER_API + "/verify-identity", options);
      const user = await res.json();
      console.log(user);
    } catch (error) {}
  };

  return (
    <div className="verify">
      <h2>Verify</h2>
      <label>
        Input Code Here:
        <input value={code} onChange={e => setCode(e.target.value)} type="text" />
      </label>
      <Button text="submit" onClick={onClick} />
    </div>
  );
};

export default Verify;
